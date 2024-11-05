import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Exame } from './entities/exame.entity';
import { CreateExameDto } from './dto/create-exame.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { error } from 'console';
import { UpdateExameDto } from './dto/update-exame.dto';
import { throws } from 'assert';
import { InternalServerErrorException } from '@nestjs/common';
import { CustomError } from 'src/shareds/errors';

@Injectable()
export class ExameService {
  constructor(
    @Inject('EXAME_REPOSITORY')
    private exameRepository: Repository<Exame>,
  ) {}

  async create(exame: CreateExameDto) {
    try {
      const novoExame = new Exame(exame);

      const examExists = await this.exameRepository.findOne({
        where: { specialty: novoExame.specialty },
      });

      console.log(examExists);

      if (examExists) {
        throw new CustomError('Exam already exists', 'specialty');
      }
      return this.exameRepository.save(novoExame);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Exame[]> {
    return this.exameRepository.find();
  }
  async findOne(id: number): Promise<Exame[]> {
    return this.exameRepository.find({ where: { id } });
  }

  async update(id: number, exameUpdate: UpdateExameDto) {
    try {
      const novoExame = new Exame(exameUpdate);

      let examExists = await this.exameRepository.findOne({
        where: { id },
      });

      if (!examExists) {
        throw new CustomError(`Exame com id ${id} não existe`);
      }

      examExists = await this.exameRepository.findOne({
        where: { specialty: novoExame.specialty },
      });

      if (examExists) {
        throw new CustomError('Exame já está cadastrado', 'specialty');
      }
      await this.exameRepository.update(id, exameUpdate);

      return this.exameRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number): Promise<void> {
    await this.exameRepository.delete(id);
  }
}
