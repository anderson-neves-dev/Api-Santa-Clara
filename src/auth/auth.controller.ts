import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    return { message: 'Login bem-sucedido', user };
  }

  @Post('register')
  async register(
    @Body() body: { nome: string; email: string; senha: string; tipo: string },
  ) {
    const user = await this.authService.registerUser(
      body.nome,
      body.email,
      body.senha,
      body.tipo,
    );
    return { message: 'Usuário registrado com sucesso: ', user };
  }
}
