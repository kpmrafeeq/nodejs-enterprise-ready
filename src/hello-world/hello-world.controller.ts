import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InitModificationCommand } from './commands/impl/init-modification.command';
import { Data } from './models/data';
import { GetDataQuery } from './queries/impl';
import { Request } from 'express';

@Controller('hello-world')
export class HelloWorldController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':data')
  async killDragon(@Param('data') data: string) {
    return this.commandBus.execute(new InitModificationCommand(data));
  }

  @Get()
  async findAll(): Promise<Data> {
    return this.queryBus.execute(new GetDataQuery());
  }
  @Get('test')
  async test(@Req() req: Request): Promise<string> {
    console.log('session user -' + req.customData.user);
    console.log('session user name -' + req.customData.username);
    req.customData.user = 'Updated user';
    req.customData.username = 'updated user namename';
    return 'Test';
  }
}
