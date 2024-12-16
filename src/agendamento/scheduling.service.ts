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
import { UpdateSchedulingDTO } from './dto/update-scheduling.dto';
import { DoctorService } from 'src/doctor/doctor.service';
import { isEmpty, isNotEmpty } from 'class-validator';
@Injectable()
export class SchedulingService {
  constructor(
    @Inject('SCHEDULING_REPOSITORY')
    private schedulingRepository: Repository<Scheduling>,
    private readonly enterpriseService: EnterpriseService,
    private readonly patientService: PacienteService,
    private readonly examService: ExameService,
    private readonly doctorService: DoctorService,

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

      const doctor = await this.doctorService.findOne(
        createSchedulingDTO.id_doctor,
      );
      if (!doctor) {
        throw new CustomError('Médico informado não está cadastrado');
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
        doctor: doctor,
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
      .leftJoinAndSelect('scheduling.doctor', 'doctor')
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
      doctor: scheduling.doctor,
      performedExams: scheduling.performedExams.map((exam) => ({
        id_exam: exam.exam?.id || null,
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
      .leftJoinAndSelect('scheduling.doctor', 'doctor')
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
      doctor: scheduling.doctor,
      performedExams: scheduling.performedExams.map((exam) => ({
        id_exam: exam.exam?.id || null,
        specialty: exam.exam?.specialty || null, // Adiciona specialty ao resultado.
        category: exam.exam?.category || null,
        laboratoryResultUrl: exam.laboratoryResultUrl,
      })),
    }));
  }

  async update(
    id: number,
    updateSchedulingDTO: UpdateSchedulingDTO,
  ): Promise<any> {
    const schedulingExisting = await this.findOne(id);

    if (!schedulingExisting) {
      throw new CustomError('Agendamento não cadastrado');
    }

    let patient = null;
    if (updateSchedulingDTO.id_patient) {
      patient = await this.patientService.findOne(
        updateSchedulingDTO.id_patient,
      );

      if (!patient) {
        throw new CustomError('Paciente com id informado não cadastrado');
      }
    }

    let enterprise = null;
    if (updateSchedulingDTO.id_enterprise) {
      enterprise = await this.enterpriseService.findOne(
        updateSchedulingDTO.id_enterprise,
      );

      if (!enterprise) {
        throw new CustomError('Empresa com id informado não cadastrado');
      }
    }
    let doctor = null;
    if (updateSchedulingDTO.id_doctor) {
      doctor = await this.doctorService.findOne(updateSchedulingDTO.id_doctor);

      if (!doctor) {
        throw new CustomError('Médico com id informado não cadastrado');
      }
    }

    let dataRealizacaoExame = null;
    if (updateSchedulingDTO.parecer) {
      updateSchedulingDTO.status = SchedulingStatus.FINALIZADO;
      dataRealizacaoExame = new Date(Date.now());
    }

    if (updateSchedulingDTO.exams.length > 0) {
      const performedExamsScheduling = schedulingExisting.performedExams.map(
        (exam) => exam.id_exam,
      );

      const examesParaAdicionar = updateSchedulingDTO.exams.filter(
        (item) => !performedExamsScheduling.includes(Number(item)),
      );

      if (isNotEmpty(examesParaAdicionar)) {
        console.log('passouaqui');
        for (const examId of examesParaAdicionar) {
          let examExisting = await this.examService.findOne(Number(examId));
          const newPerformedExam = new PerformedExam({
            exam: examExisting,
            scheduling: await this.schedulingRepository.findOne({
              where: { id },
            }),
            id_exam: examExisting.id,
            id_scheduling: id,
          });

          const newPerformedExamSave =
            await this.performedExamRepository.save(newPerformedExam);
        }
      }

      const examesParaRemover = performedExamsScheduling.filter(
        (item) => !updateSchedulingDTO.exams.map(Number).includes(item),
      );

      for (const examId of examesParaRemover) {
        await this.performedExamRepository.delete({
          id_exam: Number(examId),
          id_scheduling: id,
        });
      }
    }

    if (isNotEmpty(updateSchedulingDTO.updatePerfomedExamDTO)) {
      for (const exam of updateSchedulingDTO.updatePerfomedExamDTO) {
        const examesRealizadosAtualizados =
          await this.performedExamRepository.update(
            { id_exam: exam.id_exam, id_scheduling: id },
            {
              id_scheduling: id,
              id_exam: exam.id_exam,
              laboratoryResultUrl: exam.laboratoryResultUrl,
            },
          );
        console.log('Url atualizada', examesRealizadosAtualizados);
      }
    }

    const schedulingUpdate = new Scheduling({
      dataAgendamento: updateSchedulingDTO.dataAgendamento
        ? new Date(updateSchedulingDTO.dataAgendamento)
        : schedulingExisting.dataAgendamento,
      dataRealizacaoExame:
        dataRealizacaoExame || schedulingExisting.dataRealizacaoExame,
      dataAvaliacao: updateSchedulingDTO.dataAvaliacao
        ? new Date(updateSchedulingDTO.dataAvaliacao)
        : schedulingExisting.dataAvaliacao,
      observacoes:
        updateSchedulingDTO.observacoes || schedulingExisting.observacoes,
      parecer: updateSchedulingDTO.parecer || schedulingExisting.parecer,
      tipoExame: updateSchedulingDTO.tipoExame || schedulingExisting.tipoExame,
      status: updateSchedulingDTO.status || schedulingExisting.status,
      doctor: doctor || schedulingExisting.doctor,
      patient: patient || schedulingExisting.patient,
      enterprise: enterprise || schedulingExisting.enterprise,
    });

    return await this.schedulingRepository.update(id, schedulingUpdate);
  }

  async delete(id: number): Promise<void> {
    await this.schedulingRepository.delete(id);
  }
}
