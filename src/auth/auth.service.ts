import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UpdateDto } from './dto/update.dto';
import { UserType } from './enums/user-type.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private readonly usuarioRepository: Repository<User>,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { email, senha } = loginDto;

    const user = await this.usuarioRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return user;
  }

  async registerUser(
    nome: string,
    email: string,
    senha: string,
    tipo: UserType,
  ) {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = this.usuarioRepository.create({
      nome,
      email,
      senha: hashedPassword,
      tipo,
    });

    return this.usuarioRepository.save(newUser);
  }

  async findAllUsers() {
    return await this.usuarioRepository.find();
  }

  async deleteUser(id: number) {
    const user = await this.usuarioRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.usuarioRepository.remove(user);
  }

  async updateUser(id: number, updateData: Partial<UpdateDto>) {
    const user = await this.usuarioRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    Object.assign(user, updateData);
    return await this.usuarioRepository.save(user);
  }
}
