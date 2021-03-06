import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from './store.entity';
import { User } from '../users/user.entity';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Store, User]), CaslModule],
  exports: [StoresService],
  providers: [StoresService],
  controllers: [StoresController],
})
export class StoresModule {}
