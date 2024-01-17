import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InitModificationCommand } from '../impl/init-modification.command';

@CommandHandler(InitModificationCommand)
export class InitModificationCommandHandler
  implements ICommandHandler<InitModificationCommand>
{
  constructor(private readonly publisher: EventPublisher) {}
  async execute(command: InitModificationCommand) {
    console.log('command' + command.data);
  }
}
