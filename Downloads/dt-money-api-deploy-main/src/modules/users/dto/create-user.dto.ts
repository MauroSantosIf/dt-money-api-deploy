import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: 'Nome do usuário', example: 'Mauro Santos' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  name: string;

  @ApiProperty({ description: 'Email do usuário', example: 'mauro@email.com' })
  @IsEmail({}, { message: 'Informe um email válido' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: '12345678', minLength: 6 })
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}
