import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistEntity } from 'src/artist/artist.entity';
import { DtoValidatorModule } from 'src/dtoValidator/dtoValidator.module';
import { LoggingModule } from 'src/logger/logger.module';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
  imports: [
    DtoValidatorModule,
    TypeOrmModule.forFeature([ArtistEntity]),
    LoggingModule,
  ],
  exports: [TypeOrmModule],
})
export class ArtistModule {}
