import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Exame } from './entities/exame.entity';
import { CreateExameDto } from './dto/create-exame.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { error } from 'console';
import { UpdateExameDto } from './dto/update-exame.dto';

@Injectable()
export class ExameService {
  constructor(
    @Inject('EXAME_REPOSITORY')
    private exameRepository: Repository<Exame>,
  ) {}

  async create(exame: CreateExameDto): Promise<ResultadoDto> {
    let novoExame = new Exame(exame);
    return this.exameRepository
      .save(novoExame)
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Exame cadastrado com suceso',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Houve um erro ao cadastrar um exame',
        };
      });
  }

  async findAll(): Promise<Exame[]> {
    return this.exameRepository.find();
  }
  async findOne(id: number): Promise<Exame[]> {
    return this.exameRepository.find({ where: { id } });
  }

  async update(id: number, exameUpdate: UpdateExameDto) {
    await this.exameRepository.update(id, exameUpdate);

    return this.exameRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.exameRepository.delete(id);
  }
}
