import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CostService } from './cost.service';
import { CostController } from './cost.controller';
import { Cost, CostsSchema } from 'src/schemas/cost.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cost.name, schema: CostsSchema }]),
    AuthModule,
  ],
  controllers: [CostController],
  providers: [CostService],
})
export class CostsModule {}
