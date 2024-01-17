import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { HelloWorldController } from './hello-world.controller';
import { QueryHandlers } from './queries/handlers';
import { HelloWorldSagas } from './sagas/hello-world.sagas';
import { SessionManager } from 'src/middlewares/session.middleware';

@Module({
  imports: [CqrsModule],
  controllers: [HelloWorldController],
  providers: [
    //HeroRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    HelloWorldSagas,
  ],
})
export class HelloWorldModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionManager)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
