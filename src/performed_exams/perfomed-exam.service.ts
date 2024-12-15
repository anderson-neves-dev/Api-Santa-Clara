import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { Repository } from 'typeorm';
import { PerformedExam } from './entities/performed-exam.entity';
@Injectable()
export class PerformedExamService {
  constructor(
    @Inject('PERFORMED_EXAM_REPOSITORY')
    private performedExamRepository: Repository<PerformedExam>,
  ) {}
}
