import { AggregateRoot } from '@nestjs/cqrs';

export class Data extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }
}
