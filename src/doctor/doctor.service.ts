import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { removeSpecialChars } from 'src/shareds/helpers';
import { CustomError } from 'src/shareds/errors';
import { Doctor } from './entites/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @Inject('DOCTOR_REPOSITORY')
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDTO: CreateDoctorDto): Promise<CreateDoctorDto> {
    try {
      createDoctorDTO.crm = removeSpecialChars(createDoctorDTO.crm);
      const newDoctor = new Doctor(createDoctorDTO);

      const crmExisting = await this.findWithCRM(createDoctorDTO.crm);

      if (crmExisting) {
        throw new CustomError(`O CRM já está cadastrado`, 'crm');
      }

      if (newDoctor.telephone.length != 11) {
        throw new CustomError(
          `O número de telefone deve conter 11 caracteres`,
          'telephone',
        );
      }

      return this.doctorRepository.save(newDoctor);
    } catch (error) {
      console.error(error.message, error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async findOne(id: number): Promise<Doctor> {
    return this.doctorRepository.findOne({ where: { id } });
  }

  async findWithCRM(documentNumber: string) {
    const customer = await this.doctorRepository.findOne({
      where: { crm: removeSpecialChars(documentNumber) },
    });

    return customer;
  }

  async update(id: number, updateDoctorDTO: UpdateDoctorDto): Promise<Doctor> {
    try {
      const doctorExisting = await this.findOne(id);

      if (!doctorExisting) {
        throw new CustomError('Médico com id informado não cadastrado');
      }

      // Normaliza CPF e CEP apenas se estiverem presentes
      const crmNormalizado = updateDoctorDTO.crm
        ? removeSpecialChars(updateDoctorDTO.crm)
        : doctorExisting.crm;

      // Filtra os campos vazios e mantém os valores existentes ou `null`
      const dateUpdateDoctor = {
        crm: crmNormalizado,
        name: updateDoctorDTO.name || doctorExisting.name,
        email: updateDoctorDTO.email || doctorExisting.email,
        telephone: updateDoctorDTO.telephone || doctorExisting.telephone,
      };

      // Verifica duplicidade de CRM
      if (dateUpdateDoctor.crm && dateUpdateDoctor.crm !== doctorExisting.crm) {
        const crmExisting = await this.findWithCRM(dateUpdateDoctor.crm);
        if (crmExisting) {
          throw new CustomError(`O CRM já está cadastrado`, 'crm');
        }
      }

      if (
        dateUpdateDoctor.telephone &&
        dateUpdateDoctor.telephone.length != 11
      ) {
        throw new CustomError(
          `O número de telefone deve conter 11 caracteres`,
          'telephone',
        );
      }

      await this.doctorRepository.update(id, dateUpdateDoctor);
      return this.findOne(id);
    } catch (error) {
      console.error(error.message, error);
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
