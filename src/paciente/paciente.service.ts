import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { CreatePacienteDTO } from './dto/create-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { UpdatePacienteDTO } from './dto/update-paciente.dto';
import { Repository } from 'typeorm';
import { removeSpecialChars } from 'src/shareds/helpers';

@Injectable()
export class PacienteService {
  constructor(
    @Inject('PACIENTE_REPOSITORY')
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async create(
    createPacienteDTO: CreatePacienteDTO,
  ): Promise<CreatePacienteDTO> {
    try {
      createPacienteDTO.cpf = removeSpecialChars(createPacienteDTO.cpf);
      console.log(createPacienteDTO.cpf);
      const novoPaciente = new Paciente();
      Object.assign(novoPaciente, createPacienteDTO);

      const cpfExisting = await this.findWithCPF(createPacienteDTO.cpf);

      if (cpfExisting) {
        throw new Error(`Document ${cpfExisting.cpf} in use!`);
      }

      return this.pacienteRepository.save(novoPaciente);
    } catch (error) {
      console.error(error.message, error);
      throw new InternalServerErrorException(error.message, error);
    }
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find();
  }

  async findOne(id: number): Promise<Paciente> {
    return this.pacienteRepository.findOne({ where: { id } });
  }

  async findWithCPF(documentNumber: string) {
    const customer = await this.pacienteRepository.findOne({
      where: { cpf: documentNumber },
    });

    return customer;
  }

  async update(
    id: number,
    updatePacienteDTO: UpdatePacienteDTO,
  ): Promise<Paciente> {
    await this.pacienteRepository.update(id, updatePacienteDTO);
    return this.pacienteRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.pacienteRepository.delete(id);
  }
}
