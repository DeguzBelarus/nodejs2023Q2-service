import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
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
import { LoggingService } from 'src/logger/logger.service';

@Injectable()
export class TrackService implements OnModuleInit {
  constructor(
    private readonly dtoTrackValidator: DtoTrackValidatorService,
    private readonly loggingService: LoggingService,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  onModuleInit() {
    this.loggingService.setContext(TrackService.name);
  }

  async getAll() {
    this.loggingService.verbose('Getting all tracks data...');
    return await this.trackRepository.find();
  }

  async getById(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(`Searching for the track with ID ${id}...`);
    const foundTrack = await this.trackRepository.findOneBy({ id });
    if (!foundTrack) {
      throw new NotFoundException({
        message: 'The track with the specified ID was not found',
      });
    } else {
      this.loggingService.verbose(
        `Track with ID ${id} data was successfully found`,
      );
      return foundTrack;
    }
  }

  async createTrack(
    createTrackDto: ICreateTrackDto,
  ): Promise<CreateEntityResultType<TrackEntity>> {
    const createTrackDtoValidationResult =
      this.dtoTrackValidator.createTrackDtoValidate(createTrackDto);
    if (typeof createTrackDtoValidationResult === 'string') {
      throw new BadRequestException({
        message: createTrackDtoValidationResult,
      });
    }
    this.loggingService.verbose(
      `Searching for the artist with ID ${createTrackDto.artistId}...`,
    );
    const foundArtist = await this.artistRepository.findOneBy({
      id: createTrackDto.artistId,
    });
    if (!foundArtist) {
      throw new BadRequestException({
        message: `Request contains invalid artist ID ${createTrackDto.artistId} that doesn't exist`,
      });
    }
    this.loggingService.verbose(
      `Searching for the album with ID ${createTrackDto.albumId}...`,
    );
    const foundAlbum = await this.albumRepository.findOneBy({
      id: createTrackDto.albumId,
    });
    if (!foundAlbum) {
      throw new BadRequestException({
        message: `Request contains invalid album ID ${createTrackDto.albumId} that doesn't exist`,
      });
    }
    this.loggingService.verbose(`Creating a new track...`);
    return await this.trackRepository.save(createTrackDto);
  }

  async updateTrack(
    id: string,
    updateTrackDto: IUpdateTrackDto,
  ): Promise<UpdateEntityResultType<TrackEntity>> {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    const updateTrackDtoValidationResult =
      this.dtoTrackValidator.updateTrackDtoValidate(updateTrackDto);
    if (typeof updateTrackDtoValidationResult === 'string') {
      throw new BadRequestException({
        message: updateTrackDtoValidationResult,
      });
    }
    this.loggingService.verbose(`Searching for the track with ID ${id}...`);
    const foundTrack = await this.trackRepository.findOneBy({ id });
    if (!foundTrack) {
      throw new NotFoundException({
        message: `Specified track with id ${id} doesn't exist`,
      });
    }
    if (typeof updateTrackDto.artistId === 'string') {
      this.loggingService.verbose(
        `Searching for the artist with ID ${updateTrackDto.artistId}...`,
      );
      const foundArtist = await this.artistRepository.findOneBy({
        id: updateTrackDto.artistId,
      });
      if (!foundArtist) {
        throw new BadRequestException({
          message: `Request contains invalid artist ID ${updateTrackDto.artistId} that doesn't exist`,
        });
      }
    }
    if (typeof updateTrackDto.albumId === 'string') {
      this.loggingService.verbose(
        `Searching for the album with ID ${updateTrackDto.albumId}...`,
      );
      const foundAlbum = await this.albumRepository.findOneBy({
        id: updateTrackDto.albumId,
      });
      if (!foundAlbum) {
        throw new BadRequestException({
          message: `Request contains invalid album ID ${updateTrackDto.albumId} that doesn't exist`,
        });
      }
    }
    await this.trackRepository.update(id, updateTrackDto);
    this.loggingService.verbose(
      `The track with ID ${id} data was successfully updated...`,
    );
    return await this.trackRepository.findOneBy({ id });
  }

  async deleteTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(`Searching for the track with ID ${id}...`);
    const foundTrack = await this.trackRepository.findOneBy({ id });
    if (!foundTrack) {
      throw new NotFoundException({
        message: 'The track with the specified ID was not found',
      });
    }
    await foundTrack.remove();
    this.loggingService.verbose(`Track with ID ${id} was successfully deleted`);
    return 'success';
  }
}
