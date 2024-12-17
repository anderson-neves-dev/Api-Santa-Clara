// src/auth/auth.service.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

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

  async registerUser(nome: string, email: string, senha: string, tipo: string) {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = this.usuarioRepository.create({
      nome,
      email,
      senha: hashedPassword,
      tipo: tipo as 'administrador' | 'colaborador',
    });

    return this.usuarioRepository.save(newUser);
  }
}
