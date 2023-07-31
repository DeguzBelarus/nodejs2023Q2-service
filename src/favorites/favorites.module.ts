import { Module } from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [DbModule],
})
export class FavoritesModule {}
