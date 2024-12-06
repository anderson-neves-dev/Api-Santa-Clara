import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Exame } from './entities/exame.entity';
import { CreateExameDto } from './dto/create-exame.dto';
import { UpdateExameDto } from './dto/update-exame.dto';
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
        throw new CustomError('Exame ja existe!', 'specialty');
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
      let examExists = await this.exameRepository.findOne({
        where: { id },
      });

      if (!examExists) {
        throw new CustomError(`Exame com id ${id} não existe`);
      }
      const novoExame = new Exame({
        category: exameUpdate.category || examExists.category,
        specialty: exameUpdate.specialty || examExists.specialty,
      });

      if (exameUpdate.specialty) {
        examExists = await this.exameRepository.findOne({
          where: { specialty: exameUpdate.specialty },
        });

        console.log(examExists);
        if (examExists && examExists.id != id) {
          throw new CustomError('Exame já está cadastrado', 'specialty');
        }
      }

      await this.exameRepository.update(id, novoExame);

      return this.exameRepository.findOne({ where: { id } });
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number): Promise<void> {
    await this.exameRepository.delete(id);
  }
}
