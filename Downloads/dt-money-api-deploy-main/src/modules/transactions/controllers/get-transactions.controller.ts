import { Controller, Get, Res, HttpStatus, Query } from "@nestjs/common";
import { GetTransactionsService } from "../services/get-transactions.service";
import type { Response } from 'express';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindTransactionsQueryDTO } from "../dto/find-transactions-query.dto";

@ApiTags('transactions')
@Controller('transactions')
export class GetTransactionsController {
    constructor( private readonly getTransactionsService: GetTransactionsService){
        
    }

    @Get('')
    @ApiOperation({ summary: 'Listar todas as transações financeiras' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de transações retornada com sucesso.' })
    @ApiQuery({ name: 'type', required: false, enum: ['INCOME', 'OUTCOME'] })
    @ApiQuery({ name: 'startDate', required: false, example: '2026-05-01T00:00:00Z' })
    @ApiQuery({ name: 'endDate', required: false, example: '2026-05-31T23:59:59Z' })
    async getTransactions(@Query() query: FindTransactionsQueryDTO, @Res() res: Response) {
    const transactions = await this.getTransactionsService.execute(query);
    return res.status(HttpStatus.OK).json(transactions);
    }

}