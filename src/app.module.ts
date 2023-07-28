import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UserModule, ArtistModule],
})
export class AppModule {}
