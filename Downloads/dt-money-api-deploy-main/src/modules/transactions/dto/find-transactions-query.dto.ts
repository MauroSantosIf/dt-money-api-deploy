import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsOptional } from 'class-validator';

export class FindTransactionsQueryDTO {
  @ApiPropertyOptional({ description: 'Tipo da transação', enum: ['INCOME', 'OUTCOME'], example: 'INCOME' })
  @IsOptional()
  @IsIn(['INCOME', 'OUTCOME'], { message: 'O tipo deve ser INCOME ou OUTCOME' })
  type?: 'INCOME' | 'OUTCOME';

  @ApiPropertyOptional({ description: 'Data inicial do filtro', example: '2026-05-01T00:00:00Z' })
  @IsOptional()
  @IsDate({ message: 'A data inicial deve ser uma data válida' })
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({ description: 'Data final do filtro', example: '2026-05-31T23:59:59Z' })
  @IsOptional()
  @IsDate({ message: 'A data final deve ser uma data válida' })
  @Type(() => Date)
  endDate?: Date;
}
