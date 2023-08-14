import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as uuidValidate } from 'uuid';

import {
  CreateEntityResultType,
  ICreateTrackDto,
  IUpdateTrackDto,
  UpdateEntityResultType,
} from 'src/types/types';
import { DtoTrackValidatorService } from 'src/dtoValidator/services/dtoTrackValidator.service';
import { TrackEntity } from 'src/track/track.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';

@Injectable()
export class TrackService {
  constructor(
    private readonly dtoTrackValidator: DtoTrackValidatorService,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    return await this.trackRepository.find();
  }

  async getById(id: string) {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundTrack = await this.trackRepository.findOneBy({ id });
    return foundTrack ? foundTrack : "entity doesn't exist";
  }

  async createTrack(
    createTrackDto: ICreateTrackDto,
  ): Promise<CreateEntityResultType<TrackEntity>> {
    const createTrackDtoValidationResult =
      this.dtoTrackValidator.createTrackDtoValidate(createTrackDto);
    if (typeof createTrackDtoValidationResult === 'string') {
      return createTrackDtoValidationResult;
    }
    const foundArtist = await this.artistRepository.findOneBy({
      id: createTrackDto.artistId,
    });
    if (!foundArtist) return 'invalid data';
    const foundAlbum = await this.albumRepository.findOneBy({
      id: createTrackDto.albumId,
    });
    if (!foundAlbum) return 'invalid data';
    return await this.trackRepository.save(createTrackDto);
  }

  async updateTrack(
    id: string,
    updateTrackDto: IUpdateTrackDto,
  ): Promise<UpdateEntityResultType<TrackEntity>> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const updateTrackDtoValidationResult =
      this.dtoTrackValidator.updateTrackDtoValidate(updateTrackDto);
    if (typeof updateTrackDtoValidationResult === 'string') {
      return updateTrackDtoValidationResult;
    }
    const foundTrack = await this.trackRepository.findOneBy({ id });
    if (!foundTrack) return "entity doesn't exist";
    if (typeof updateTrackDto.artistId === 'string') {
      const foundArtist = await this.artistRepository.findOneBy({
        id: updateTrackDto.artistId,
      });
      if (!foundArtist) return 'invalid data';
    }
    if (typeof updateTrackDto.albumId === 'string') {
      const foundAlbum = await this.albumRepository.findOneBy({
        id: updateTrackDto.albumId,
      });
      if (!foundAlbum) return 'invalid data';
    }
    await this.trackRepository.update(id, updateTrackDto);
    return await this.trackRepository.findOneBy({ id });
  }

  async deleteTrack(id: string) {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundTrack = await this.trackRepository.findOneBy({ id });
    if (!foundTrack) return "entity doesn't exist";
    await foundTrack.remove();
    return 'success';
  }
}
