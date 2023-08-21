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
  ICreateAlbumDto,
  IUpdateAlbumDto,
  UpdateEntityResultType,
} from 'src/types/types';
import { AlbumEntity } from 'src/album/album.entity';
import { DtoAlbumValidatorService } from 'src/dtoValidator/services/dtoAlbumValidator.service';
import { ArtistEntity } from 'src/artist/artist.entity';
import { LoggingService } from 'src/logger/logger.service';

@Injectable()
export class AlbumService implements OnModuleInit {
  constructor(
    private readonly dtoAlbumValidator: DtoAlbumValidatorService,
    private readonly loggingService: LoggingService,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  onModuleInit() {
    this.loggingService.setContext(AlbumService.name);
  }

  async getAll() {
    this.loggingService.verbose('Getting all albums data...');
    return await this.albumRepository.find();
  }

  async getById(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(`Searching for the album with ID ${id}...`);
    const foundAlbum = await this.albumRepository.findOneBy({ id });
    if (!foundAlbum) {
      throw new NotFoundException({
        message: 'The album with the specified ID was not found',
      });
    } else {
      this.loggingService.verbose(
        `Album with ID ${id} data was successfully found`,
      );
      return foundAlbum;
    }
  }

  async createAlbum(
    createAlbumDto: ICreateAlbumDto,
  ): Promise<CreateEntityResultType<AlbumEntity>> {
    const createAlbumDtoValidationResult =
      this.dtoAlbumValidator.createAlbumDtoValidate(createAlbumDto);
    if (typeof createAlbumDtoValidationResult === 'string') {
      throw new BadRequestException({
        message: createAlbumDtoValidationResult,
      });
    }
    this.loggingService.verbose(
      `Searching for the artist with ID ${createAlbumDto.artistId}...`,
    );
    const foundArtist = await this.artistRepository.findOneBy({
      id: createAlbumDto.artistId,
    });
    if (!foundArtist) {
      throw new BadRequestException({
        message: `Request contains invalid artist ID ${createAlbumDto.artistId} that doesn't exist`,
      });
    }
    this.loggingService.verbose(`Creating a new album...`);
    return await this.albumRepository.save(createAlbumDto);
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: IUpdateAlbumDto,
  ): Promise<UpdateEntityResultType<AlbumEntity>> {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    const updateAlbumDtoValidationResult =
      this.dtoAlbumValidator.updateAlbumDtoValidate(updateAlbumDto);
    if (typeof updateAlbumDtoValidationResult === 'string') {
      throw new BadRequestException({
        message: updateAlbumDtoValidationResult,
      });
    }
    this.loggingService.verbose(`Searching for the album with ID ${id}...`);
    const foundAlbum = await this.albumRepository.findOneBy({ id });
    if (!foundAlbum) {
      throw new NotFoundException({
        message: `Specified album with id ${id} doesn't exist`,
      });
    }
    if (typeof updateAlbumDto.artistId === 'string') {
      this.loggingService.verbose(
        `Searching for the artist with ID ${updateAlbumDto.artistId}...`,
      );
      const foundArtist = await this.artistRepository.findOneBy({
        id: updateAlbumDto.artistId,
      });
      if (!foundArtist) {
        throw new BadRequestException({
          message: `Request contains invalid artist ID ${updateAlbumDto.artistId} that doesn't exist`,
        });
      }
    }
    await this.albumRepository.update(id, updateAlbumDto);
    this.loggingService.verbose(
      `The album with ID ${id} data was successfully updated...`,
    );
    return await this.albumRepository.findOneBy({ id });
  }

  async deleteAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(`Searching for the album with ID ${id}...`);
    const foundAlbum = await this.albumRepository.findOneBy({ id });
    if (!foundAlbum) {
      throw new NotFoundException({
        message: 'The album with the specified ID was not found',
      });
    }
    await foundAlbum.remove();
    this.loggingService.verbose(`Album with ID ${id} was successfully deleted`);
    return 'success';
  }
}
