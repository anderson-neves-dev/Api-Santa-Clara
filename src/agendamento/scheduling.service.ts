import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { Repository } from 'typeorm';
import { Scheduling } from './entites/scheduling.entity';
import { PacienteService } from 'src/paciente/paciente.service';
import { CreateSchedulingDTO } from './dto/create-scheduling.dto';
import { CustomError } from 'src/shareds/errors';
import { ExameService } from 'src/exame/exame.service';
import { SchedulingStatus } from 'src/shareds/enum/scheduling-status.enum';
import { PerformedExam } from 'src/performed_exams/entities/performed-exam.entity';
@Injectable()
export class SchedulingService {
  constructor(
    @Inject('SCHEDULING_REPOSITORY')
    private schedulingRepository: Repository<Scheduling>,
    private readonly enterpriseService: EnterpriseService,
    private readonly patientService: PacienteService,
    private readonly examService: ExameService,

    @Inject('PERFORMED_EXAM_REPOSITORY')
    private performedExamRepository: Repository<PerformedExam>,
  ) {}

  async create(createSchedulingDTO: CreateSchedulingDTO): Promise<Scheduling> {
    try {
      const patient = await this.patientService.findOne(
        createSchedulingDTO.id_patient,
      );
      if (!patient) {
        throw new CustomError('Paciente informado não está cadastrado');
      }
      const enterprise = await this.enterpriseService.findOne(
        createSchedulingDTO.id_enterprise,
      );
      if (!enterprise) {
        throw new CustomError('Empresa informado não está cadastrado');
      }

      for (const examId of createSchedulingDTO.exams) {
        console.log(examId);
        let examExisting = await this.examService.findOne(examId);

        if (!examExisting) {
          throw new CustomError('Exame informado não está cadastrado');
        }
      }

      const dateNow = new Date();
      const newScheduling = new Scheduling({
        dataSolicitacao: dateNow,
        dataAgendamento: new Date(createSchedulingDTO.dataAgendamento),
        enterprise: enterprise,
        patient: patient,
        status: SchedulingStatus.AGENDADO,
      });

      const scheduling = await this.schedulingRepository.save(newScheduling);

      console.log('Scheduling Saved:', scheduling);

      for (const examId of createSchedulingDTO.exams) {
        let examExisting = await this.examService.findOne(examId);
        const newPerformedExam = new PerformedExam({
          exam: examExisting,
          scheduling: scheduling,
          id_exam: examExisting.id,
          id_scheduling: scheduling.id,
        });

        const newPerformedExamSave =
          await this.performedExamRepository.save(newPerformedExam);
        console.log('newPerformedExamSave Saved:', newPerformedExamSave);
      }

      return scheduling;
    } catch (error) {
      console.error(error.message, error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<any> {
    const scheduling = await this.schedulingRepository
      .createQueryBuilder('scheduling')
      .leftJoinAndSelect('scheduling.patient', 'patient')
      .leftJoinAndSelect('scheduling.enterprise', 'enterprise')
      .leftJoinAndSelect('scheduling.performedExams', 'performedExams')
      .leftJoinAndSelect('performedExams.exam', 'exam') // Inclui o relacionamento com os detalhes do exame.
      .where('scheduling.id = :id', { id }) // Busca o agendamento com o ID fornecido.
      .getOne();

    if (!scheduling) {
      throw new CustomError(
        'Id informado não corresponde a um agendamento',
        'id',
      ); // Caso não encontre o agendamento, lança um erro.
    }

    // Formata o dado no formato esperado
    return {
      id: scheduling.id,
      dataSolicitacao: scheduling.dataSolicitacao,
      dataAvaliacao: scheduling.dataAvaliacao,
      dataRealizacaoExame: scheduling.dataRealizacaoExame,
      dataAgendamento: scheduling.dataAgendamento,
      observacoes: scheduling.observacoes,
      status: scheduling.status,
      tipoExame: scheduling.tipoExame,
      parecer: scheduling.parecer,
      patient: scheduling.patient,
      enterprise: scheduling.enterprise,
      performedExams: scheduling.performedExams.map((exam) => ({
        specialty: exam.exam?.specialty || null, // Adiciona specialty ao resultado.
        category: exam.exam?.category || null,
        laboratoryResultUrl: exam.laboratoryResultUrl,
      })),
    };
  }

  async findAll(): Promise<any[]> {
    const schedulings = await this.schedulingRepository
      .createQueryBuilder('scheduling')
      .leftJoinAndSelect('scheduling.patient', 'patient')
      .leftJoinAndSelect('scheduling.enterprise', 'enterprise')
      .leftJoinAndSelect('scheduling.performedExams', 'performedExams')
      .leftJoinAndSelect('performedExams.exam', 'exam') // Inclui o relacionamento com os detalhes do exame.
      .getMany();

    // Formata os dados no formato esperado
    return schedulings.map((scheduling) => ({
      id: scheduling.id,
      dataSolicitacao: scheduling.dataSolicitacao,
      dataAvaliacao: scheduling.dataAvaliacao,
      dataRealizacaoExame: scheduling.dataRealizacaoExame,
      dataAgendamento: scheduling.dataAgendamento,
      observacoes: scheduling.observacoes,
      status: scheduling.status,
      tipoExame: scheduling.tipoExame,
      parecer: scheduling.parecer,
      patient: scheduling.patient,
      enterprise: scheduling.enterprise,
      performedExams: scheduling.performedExams.map((exam) => ({
        specialty: exam.exam?.specialty || null, // Adiciona specialty ao resultado.
        category: exam.exam?.category || null,
        laboratoryResultUrl: exam.laboratoryResultUrl,
      })),
    }));
  }
}
