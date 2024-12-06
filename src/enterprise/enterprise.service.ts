import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { removeSpecialChars } from 'src/shareds/helpers';
import { CustomError } from 'src/shareds/errors';
import { Enterprise } from './entities/enterprise.entity';
import { CreateEnterpriseDTO } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDTO } from './dto/update-enterprise';
import { cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class EnterpriseService {
  constructor(
    @Inject('ENTERPRISE_REPOSITORY')
    private enterpriseRepository: Repository<Enterprise>,
  ) {}

  async create(
    createEnterpriseDTO: CreateEnterpriseDTO,
  ): Promise<CreateEnterpriseDTO> {
    try {
      createEnterpriseDTO.cnpj = removeSpecialChars(createEnterpriseDTO.cnpj);
      createEnterpriseDTO.cep = removeSpecialChars(createEnterpriseDTO.cep);
      console.log(createEnterpriseDTO);
      const newEnterprise = new Enterprise(createEnterpriseDTO);

      const cnpjExisting = await this.findWithCNPJ(createEnterpriseDTO.cnpj);

      if (cnpjExisting) {
        throw new CustomError(`O CNPJ já está cadastrado`, 'cnpj');
      }

      return this.enterpriseRepository.save(newEnterprise);
    } catch (error) {
      console.error(error.message, error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Enterprise[]> {
    return this.enterpriseRepository.find();
  }

  async findOne(id: number): Promise<Enterprise> {
    return this.enterpriseRepository.findOne({ where: { id } });
  }

  async findWithCNPJ(documentNumber: string) {
    const enterprise = await this.enterpriseRepository.findOne({
      where: { cnpj: documentNumber },
    });

    return enterprise;
  }

  async update(
    id: number,
    updateEnterpriseDTO: UpdateEnterpriseDTO,
  ): Promise<Enterprise> {
    try {
      const enterpriseExisting = await this.findOne(id);

      if (!enterpriseExisting) {
        throw new CustomError('Empresa com id informado não está cadastrado');
      }

      // Normaliza CNPJ e CEP apenas se estiverem presentes
      const CNPJNormalizado = updateEnterpriseDTO
        ? removeSpecialChars(updateEnterpriseDTO.cnpj)
        : updateEnterpriseDTO.cnpj;
      const cepNormalizado = updateEnterpriseDTO.cep
        ? removeSpecialChars(updateEnterpriseDTO.cep)
        : updateEnterpriseDTO.cep;

      // Filtra os campos vazios e mantém os valores existentes ou `null`
      const dateUpdate = {
        cnpj: CNPJNormalizado,
        cep: cepNormalizado,
        legalName:
          updateEnterpriseDTO.legalName || enterpriseExisting.legalName,
        phoneNumber:
          updateEnterpriseDTO.phoneNumber || enterpriseExisting.phoneNumber,
        street: updateEnterpriseDTO.street || enterpriseExisting.street,
        number: updateEnterpriseDTO.number || enterpriseExisting.number,
        complement:
          updateEnterpriseDTO.complement || enterpriseExisting.complement,
        neighborhood:
          updateEnterpriseDTO.neighborhood || enterpriseExisting.neighborhood,
        city: updateEnterpriseDTO.city || enterpriseExisting.city,
        state: updateEnterpriseDTO.state || enterpriseExisting.state,
        email: updateEnterpriseDTO.email || enterpriseExisting.email,
      };

      // Verifica duplicidade de CNPJ
      if (dateUpdate.cnpj && dateUpdate.cnpj !== enterpriseExisting.cnpj) {
        const cnpjExisting = await this.findWithCNPJ(dateUpdate.cnpj);
        if (cnpjExisting) {
          throw new CustomError(`O CNPJ já está cadastrado`, 'cnpj');
        }
      }

      await this.enterpriseRepository.update(id, dateUpdate);
      return this.findOne(id);
    } catch (error) {
      console.error(error.message, error);
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number): Promise<void> {
    await this.enterpriseRepository.delete(id);
  }
}
