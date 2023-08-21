import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as uuidValidate } from 'uuid';

import {
  FavoriteAlbumsEntity,
  FavoriteArtistsEntity,
  FavoriteTracksEntity,
} from './favorites.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { TrackEntity } from 'src/track/track.entity';
import {
  AddFavoriteResultType,
  DeleteFavoriteResultType,
} from 'src/types/types';
import { LoggingService } from 'src/logger/logger.service';

@Injectable()
export class FavoritesService implements OnModuleInit {
  constructor(
    private readonly loggingService: LoggingService,
    @InjectRepository(FavoriteArtistsEntity)
    private readonly favoriteArtistsRepository: Repository<FavoriteArtistsEntity>,
    @InjectRepository(FavoriteAlbumsEntity)
    private readonly favoriteAlbumsRepository: Repository<FavoriteAlbumsEntity>,
    @InjectRepository(FavoriteTracksEntity)
    private readonly favoriteTracksRepository: Repository<FavoriteTracksEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistsRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumsRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  onModuleInit() {
    this.loggingService.setContext(FavoritesService.name);
  }

  async get() {
    this.loggingService.verbose(
      'Getting all favorites artists, albums and tracks data...',
    );
    const favoriteArtists = await this.favoriteArtistsRepository.find({
      relations: { artist: true },
    });
    const favoriteAlbums = await this.favoriteAlbumsRepository.find({
      relations: { album: true },
    });
    const favoriteTracks = await this.favoriteTracksRepository.find({
      relations: { track: true },
    });
    this.loggingService.verbose(
      'The requested data about favorites was successfully found...',
    );
    return {
      artists: favoriteArtists.map((favoriteArtist) => favoriteArtist.artist),
      albums: favoriteAlbums.map((favoriteAlbum) => favoriteAlbum.album),
      tracks: favoriteTracks.map((favoriteTrack) => favoriteTrack.track),
    };
  }

  async addArtist(id: string): Promise<AddFavoriteResultType> {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(`Searching for the artist with ID ${id}...`);
    const foundArtist = await this.artistsRepository.findOneBy({ id });
    if (!foundArtist) {
      throw new UnprocessableEntityException({
        message: 'The artist with the specified ID was not found',
      });
    }
    await this.favoriteArtistsRepository.save({ artistId: id });
    this.loggingService.verbose(
      `Artist with ID ${id} was successfully added into favorites`,
    );
    return 'success';
  }

  async addAlbum(id: string): Promise<AddFavoriteResultType> {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(`Searching for the album with ID ${id}...`);
    const foundAlbum = await this.albumsRepository.findOneBy({ id });
    if (!foundAlbum) {
      throw new UnprocessableEntityException({
        message: 'The album with the specified ID was not found',
      });
    }
    await this.favoriteAlbumsRepository.save({ albumId: id });
    this.loggingService.verbose(
      `Album with ID ${id} was successfully added into favorites`,
    );
    return 'success';
  }

  async addTrack(id: string): Promise<AddFavoriteResultType> {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(`Searching for the album with ID ${id}...`);
    const foundTrack = await this.trackRepository.findOneBy({ id });
    if (!foundTrack) {
      throw new UnprocessableEntityException({
        message: 'The track with the specified ID was not found',
      });
    }
    await this.favoriteTracksRepository.save({ trackId: id });
    this.loggingService.verbose(
      `Track with ID ${id} was successfully added into favorites`,
    );
    return 'success';
  }

  async deleteArtist(id: string): Promise<DeleteFavoriteResultType> {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(
      `Searching for the artist with ID ${id} in the favorites list...`,
    );
    const foundFavoriteArtist = await this.favoriteArtistsRepository.findOneBy({
      artistId: id,
    });
    if (!foundFavoriteArtist) {
      throw new NotFoundException({
        message:
          'The artist with the specified ID is not in the favorites list',
      });
    }
    await foundFavoriteArtist.remove();
    this.loggingService.verbose(
      `Artist with ID ${id} was successfully removed from the favorites`,
    );
    return 'success';
  }

  async deleteAlbum(id: string): Promise<DeleteFavoriteResultType> {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(
      `Searching for the album with ID ${id} in the favorites list...`,
    );
    const foundFavoriteAlbum = await this.favoriteAlbumsRepository.findOneBy({
      albumId: id,
    });
    if (!foundFavoriteAlbum) {
      throw new NotFoundException({
        message: 'The album with the specified ID is not in the favorites list',
      });
    }
    await foundFavoriteAlbum.remove();
    this.loggingService.verbose(
      `Album with ID ${id} was successfully removed from the favorites`,
    );
    return 'success';
  }

  async deleteTrack(id: string): Promise<DeleteFavoriteResultType> {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(
      `Searching for the track with ID ${id} in the favorites list...`,
    );
    const foundFavoriteTrack = await this.favoriteTracksRepository.findOneBy({
      trackId: id,
    });
    if (!foundFavoriteTrack) {
      throw new NotFoundException({
        message: 'The track with the specified ID is not in the favorites list',
      });
    }
    await foundFavoriteTrack.remove();
    this.loggingService.verbose(
      `Track with ID ${id} was successfully removed from the favorites`,
    );
    return 'success';
  }
}
