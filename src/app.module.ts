import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelloWorldModule } from './hello-world/hello-world.module';
import Configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
    }),
    HelloWorldModule,
  ],
})
export class AppModule {}
