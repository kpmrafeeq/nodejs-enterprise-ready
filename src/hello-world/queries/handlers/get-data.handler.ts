import {
  AggregateRoot,
  EventBus,
  IQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import { GetDataQuery } from '../impl';
import { ModificationStartedEvent } from 'src/hello-world/events/impl';
import { Data } from 'src/hello-world/models/data';
@QueryHandler(GetDataQuery)
export class GetDataQueryHandler
  extends AggregateRoot
  implements IQueryHandler<GetDataQuery>
{
  constructor(private eventBus: EventBus) {
    super();
  }
  async execute(query: GetDataQuery) {
    console.log('Async GetDataQuery...' + query);
    this.eventBus.publish(new ModificationStartedEvent('TEST'));
    console.log('published event1');
    return new Data('test');
  }
}
