import {
  Controller,
  Put,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { Coin } from 'src/common/types';
import { Transaction } from '../entity/transaction.entity';
import { HistoryResponse } from '../common/types';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Put(':id/deposit')
  async deposit(
    @Param('id') id: string,
    @Body() body: { coin: Coin; amount: number },
  ) {
    try {
      const result = await this.transactionService.deposit(id, body);
      return {
        message: result.transactionResult,
        currentBalance: result.currentBalance,
      };
    } catch (error: any) {
      throw new BadRequestException(
        error.message || 'Error processing deposit',
      );
    }
  }

  @Put(':id/withdraw')
  async withdraw(
    @Param('id') id: string,
    @Body() body: { coin: Coin; amount: number },
  ) {
    try {
      const result = await this.transactionService.withdraw(id, body);
      return {
        message: result.transactionResult,
        currentBalance: result.currentBalance,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error processing withdraw',
      );
    }
  }

  @Put(':from/transfer/:to')
  async transfer(
    @Param('from') from: string,
    @Param('to') to: string,
    @Body() body: { coin: Coin; amount: number },
  ) {
    try {
      const result = await this.transactionService.transfer(from, to, body);

      return {
        status: result.transactionResult.status,
        message: `${result.transactionResult.message} on ${result.transactionResult.date}`,
        currentBalance: result.currentBalance,
      };
    } catch (error) {
      if (error.message === 'Sender wallet was not found') {
        throw new NotFoundException(error.message);
      }
      if (error.message === 'Receiver wallet was not found') {
        throw new NotFoundException(error.message);
      }
      if (error.message === 'Insufficient balance') {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException(
        error.message || 'Error processing transfer',
      );
    }
  }

  @Get('history')
  async history(): Promise<Transaction[] | HistoryResponse> {
    return this.transactionService.getHistory();
  }
}
