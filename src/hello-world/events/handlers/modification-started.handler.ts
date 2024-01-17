import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ModificationStartedEvent } from '../impl/modification-started.event';

@EventsHandler(ModificationStartedEvent)
export class ModificationStartedEventHandler
  implements IEventHandler<ModificationStartedEvent>
{
  handle(event: ModificationStartedEvent) {
    console.log('ModificationStartedEvent...' + event.data);
  }
}
