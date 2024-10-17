import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Injectable()
export class PacienteService {
  constructor(
    @Inject('PACIENTE_REPOSITORY')
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async create(paciente: CreatePacienteDto): Promise<ResultadoDto> {
    let novoPaciente = new Paciente(paciente);
    return this.pacienteRepository
      .save(novoPaciente)
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Paciente cadastrado com suceso',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Houve um erro ao cadastrar um Paciente',
        };
      });
  }
}
