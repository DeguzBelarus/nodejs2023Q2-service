import { Injectable } from '@nestjs/common';
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

@Injectable()
export class FavoritesService {
  constructor(
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

  async get() {
    const favoriteArtists = await this.favoriteArtistsRepository.find({
      relations: { artist: true },
    });
    const favoriteAlbums = await this.favoriteAlbumsRepository.find({
      relations: { album: true },
    });
    const favoriteTracks = await this.favoriteTracksRepository.find({
      relations: { track: true },
    });
    return {
      artists: favoriteArtists.map((favoriteArtist) => favoriteArtist.artist),
      albums: favoriteAlbums.map((favoriteAlbum) => favoriteAlbum.album),
      tracks: favoriteTracks.map((favoriteTrack) => favoriteTrack.track),
    };
  }

  async addArtist(id: string): Promise<AddFavoriteResultType> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundArtist = await this.artistsRepository.findOneBy({ id });
    if (!foundArtist) return "entity doesn't exist";
    await this.favoriteArtistsRepository.save({ artistId: id });
    return 'success';
  }

  async addAlbum(id: string): Promise<AddFavoriteResultType> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundAlbum = await this.albumsRepository.findOneBy({ id });
    if (!foundAlbum) return "entity doesn't exist";
    await this.favoriteAlbumsRepository.save({ albumId: id });
    return 'success';
  }

  async addTrack(id: string): Promise<AddFavoriteResultType> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundTrack = await this.trackRepository.findOneBy({ id });
    if (!foundTrack) return "entity doesn't exist";
    await this.favoriteTracksRepository.save({ trackId: id });
    return 'success';
  }

  async deleteArtist(id: string): Promise<DeleteFavoriteResultType> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundFavoriteArtist = await this.favoriteArtistsRepository.findOneBy({
      artistId: id,
    });
    if (!foundFavoriteArtist) return "entity isn't favorite";
    await foundFavoriteArtist.remove();
  }

  async deleteAlbum(id: string): Promise<DeleteFavoriteResultType> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundFavoriteAlbum = await this.favoriteAlbumsRepository.findOneBy({
      albumId: id,
    });
    if (!foundFavoriteAlbum) return "entity isn't favorite";
    await foundFavoriteAlbum.remove();
  }

  async deleteTrack(id: string): Promise<DeleteFavoriteResultType> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundFavoriteTrack = await this.favoriteTracksRepository.findOneBy({
      trackId: id,
    });
    if (!foundFavoriteTrack) return "entity isn't favorite";
    await foundFavoriteTrack.remove();
  }
}
