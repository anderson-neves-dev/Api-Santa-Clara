import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePacienteDTO } from './dto/create-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { UpdatePacienteDTO } from './dto/update-paciente.dto';
import { removeSpecialChars } from 'src/shareds/helpers';
import { CustomError } from 'src/shareds/errors';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { Repository } from 'typeorm';
@Injectable()
export class PacienteService {
  constructor(
    @Inject('PACIENTE_REPOSITORY')
    private pacienteRepository: Repository<Paciente>,
    private readonly enterpriseService: EnterpriseService,
  ) {}

  async create(createPacienteDTO: CreatePacienteDTO): Promise<Paciente> {
    try {
      createPacienteDTO.cpf = removeSpecialChars(createPacienteDTO.cpf);
      createPacienteDTO.cep = removeSpecialChars(createPacienteDTO.cep);
      console.log(createPacienteDTO);

      const cpfExisting = await this.findWithCPF(createPacienteDTO.cpf);

      if (cpfExisting) {
        throw new CustomError(`O CPF já está cadastrado`, 'cpf');
      }
      const dateBirthday = new Date(createPacienteDTO.dateBirthday);

      if (dateBirthday.getTime() >= Date.now()) {
        throw new CustomError(
          `A data de nascimento não pode ser uma data futura`,
          'dateBirthday',
        );
      }

      const enterprise = await this.enterpriseService.findOne(
        createPacienteDTO.id_enterprise,
      );

      if (!enterprise) {
        throw new CustomError(
          `A empresa informada não está cadastrada`,
          'id_enterprise',
        );
      }

      const novoPaciente = new Paciente(createPacienteDTO);

      novoPaciente.enterprise = enterprise;
      return this.pacienteRepository.save(novoPaciente);
    } catch (error) {
      console.error(error.message, error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find({ relations: ['enterprise'] });
  }

  async findOne(id: number): Promise<Paciente> {
    return this.pacienteRepository.findOne({
      where: { id },
      relations: ['enterprise'],
    });
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
    try {
      const pacienteExistente = await this.findOne(id);

      if (!pacienteExistente) {
        throw new CustomError('Paciente com id informado não cadastrado');
      }

      // Normaliza CPF e CEP apenas se estiverem presentes
      const cpfNormalizado = updatePacienteDTO.cpf
        ? removeSpecialChars(updatePacienteDTO.cpf)
        : pacienteExistente.cpf;
      const cepNormalizado = updatePacienteDTO.cep
        ? removeSpecialChars(updatePacienteDTO.cep)
        : pacienteExistente.cep;

      const enterprise = updatePacienteDTO.id_enterprise
        ? await this.enterpriseService.findOne(updatePacienteDTO.id_enterprise)
        : null;

      if (updatePacienteDTO.id_enterprise && !enterprise) {
        throw new CustomError(
          `A empresa informada não está cadastrada`,
          'id_enterprise',
        );
      }

      // Filtra os campos vazios e mantém os valores existentes ou `null`
      const dataParaAtualizacao = {
        cpf: cpfNormalizado,
        cep: cepNormalizado,
        dateBirthday:
          updatePacienteDTO.dateBirthday || pacienteExistente.dateBirthday,
        name: updatePacienteDTO.name || pacienteExistente.name,
        phoneNumber:
          updatePacienteDTO.phoneNumber || pacienteExistente.phoneNumber,
        street: updatePacienteDTO.street || pacienteExistente.street,
        number: updatePacienteDTO.number || pacienteExistente.number,
        complement:
          updatePacienteDTO.complement || pacienteExistente.complement,
        neighborhood:
          updatePacienteDTO.neighborhood || pacienteExistente.neighborhood,
        city: updatePacienteDTO.city || pacienteExistente.city,
        state: updatePacienteDTO.state || pacienteExistente.state,
        email: updatePacienteDTO.email || pacienteExistente.email,
        enterprise: enterprise || pacienteExistente.enterprise,
      };

      // Verifica duplicidade de CPF
      if (
        dataParaAtualizacao.cpf &&
        dataParaAtualizacao.cpf !== pacienteExistente.cpf
      ) {
        const cpfExisting = await this.findWithCPF(dataParaAtualizacao.cpf);
        if (cpfExisting) {
          throw new CustomError(`O CPF já está cadastrado`, 'cpf');
        }
      }

      await this.pacienteRepository.update(id, dataParaAtualizacao);
      return this.findOne(id);
    } catch (error) {
      console.error(error.message, error);
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number): Promise<void> {
    await this.pacienteRepository.delete(id);
  }
}
