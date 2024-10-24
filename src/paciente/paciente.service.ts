import { Inject, Injectable } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { CreatePacienteDTO } from './dto/create-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { UpdatePacienteDTO } from './dto/update-paciente.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteService {
  constructor(
    @Inject('PACIENTE_REPOSITORY')
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDTO: CreatePacienteDTO): Promise<ResultadoDto> {
    const novoPaciente = new Paciente();
    Object.assign(novoPaciente, createPacienteDTO);

    return this.pacienteRepository
      .save(novoPaciente)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Paciente cadastrado com sucesso',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Erro ao cadastrar paciente',
        };
      });
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find();
  }

  async findOne(id: number): Promise<Paciente> {
    return this.pacienteRepository.findOne({ where: { id } });
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
