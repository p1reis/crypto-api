import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { Wallet } from '../entity/wallet.entity';
import { CreateWalletDto } from '../dto/create-wallet-dto';
import { Transaction } from '../../transaction/entity/transaction.entity';
import { HistoryResponse } from 'src/transaction/common/types';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto): Wallet {
    return this.walletService.create(createWalletDto);
  }

  @Get()
  findAll(): Wallet[] {
    return this.walletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Wallet {
    return this.walletService.findOne(id);
  }

  @Get(':id/balance')
  getBalance(@Param('id') id: string) {
    try {
      return this.walletService.getBalance(id);
    } catch (error) {
      if (error.message === 'Wallet was not found') {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Put(':id/disable')
  disable(@Param('id') id: string): { message: string } {
    try {
      const wallet = this.walletService.disable(id);
      return {
        message: `${wallet.owner}'s wallet was desactivated with sucess`,
      };
    } catch (error) {
      if (error.message === 'Wallet was not found') {
        throw new NotFoundException(error.message);
      }
      if (error.message === 'Wallet is already inactive') {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Get('/history/:id')
  async history(
    @Param('id') id: string,
  ): Promise<Transaction[] | HistoryResponse> {
    return this.walletService.getHistory(id);
  }
}
