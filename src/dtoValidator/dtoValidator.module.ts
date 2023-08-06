import { Module } from '@nestjs/common';

import { DtoUserValidatorService } from './services/dtoUserValidator.service';
import { DtoArtistValidatorService } from './services/dtoArtistValidator.service';
import { DtoAlbumValidatorService } from './services/dtoAlbumValidator.service';
import { DtoTrackValidatorService } from './services/dtoTrackValidator.service';

@Module({
  providers: [
    DtoUserValidatorService,
    DtoArtistValidatorService,
    DtoAlbumValidatorService,
    DtoTrackValidatorService,
  ],
  exports: [
    DtoUserValidatorService,
    DtoArtistValidatorService,
    DtoAlbumValidatorService,
    DtoTrackValidatorService,
  ],
})
export class DtoValidatorModule {}
