import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(message: string, path?: string) {
    super({ message, path }, HttpStatus.BAD_REQUEST);
  }
}
