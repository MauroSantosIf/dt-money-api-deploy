import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class FindUserQueryDTO {
  @ApiPropertyOptional({ description: 'Nome do usuário para busca parcial', example: 'Mauro' })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @ApiPropertyOptional({ description: 'Email do usuário para busca exata ou parcial', example: 'mauro@email.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Informe um email válido' })
  email?: string;
}
