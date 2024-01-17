import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from '@reactivex/rxjs';
import { map } from 'rxjs/operators';
import { InitModificationCommand } from '../commands/impl';
import { ModificationStartedEvent } from '../events/impl';

@Injectable()
export class HelloWorldSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    console.log('event recieved');
    return events$.pipe(
      ofType(ModificationStartedEvent),
      map(() => {
        console.log('Inside [HelloWorldSagas] Saga');
        return new InitModificationCommand('test');
      }),
    );
  };
}
