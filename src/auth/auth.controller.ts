import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    return { message: 'Login bem-sucedido', user };
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await this.authService.registerUser(
      body.nome,
      body.email,
      body.senha,
      body.tipo,
    );
    return { message: 'Usuário registrado com sucesso', user };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateDto) {
    const updatedUser = await this.authService.updateUser(id, body);
    return { message: 'Usuário atualizado com sucesso', updatedUser };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.authService.deleteUser(id);
    return { message: 'Usuário deletado com sucesso' };
  }

  @Get()
  async findAll() {
    const users = await this.authService.findAllUsers();
    return { message: 'Lista de usuários recuperada com sucesso', users };
  }
}
