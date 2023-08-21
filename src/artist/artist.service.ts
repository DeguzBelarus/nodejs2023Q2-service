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
  ICreateArtistDto,
  IUpdateArtistDto,
  UpdateEntityResultType,
} from 'src/types/types';
import { ArtistEntity } from 'src/artist/artist.entity';
import { DtoArtistValidatorService } from 'src/dtoValidator/services/dtoArtistValidator.service';
import { LoggingService } from 'src/logger/logger.service';

@Injectable()
export class ArtistService implements OnModuleInit {
  constructor(
    private readonly dtoArtistValidator: DtoArtistValidatorService,
    private readonly loggingService: LoggingService,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  onModuleInit() {
    this.loggingService.setContext(ArtistService.name);
  }

  async getAll() {
    this.loggingService.verbose('Getting all artists data...');
    return await this.artistRepository.find();
  }

  async getById(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(`Searching for the artist with ID ${id}...`);
    const foundArtist = await this.artistRepository.findOneBy({ id });
    if (!foundArtist) {
      throw new NotFoundException({
        message: 'the artist with the specified ID was not found',
      });
    } else {
      this.loggingService.verbose(
        `Artist with ID ${id} data was successfully found`,
      );
      return foundArtist;
    }
  }

  async createArtist(
    createArtistDto: ICreateArtistDto,
  ): Promise<CreateEntityResultType<ArtistEntity>> {
    const createArtistDtoValidationResult =
      this.dtoArtistValidator.createArtistDtoValidate(createArtistDto);
    if (typeof createArtistDtoValidationResult === 'string') {
      throw new BadRequestException({
        message: createArtistDtoValidationResult,
      });
    }
    this.loggingService.verbose(`Creating a new artist...`);
    return await this.artistRepository.save(createArtistDto);
  }

  async updateArtist(
    id: string,
    updateArtistDto: IUpdateArtistDto,
  ): Promise<UpdateEntityResultType<ArtistEntity>> {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    const updateArtistDtoValidationResult =
      this.dtoArtistValidator.updateArtistDtoValidate(updateArtistDto);
    if (typeof updateArtistDtoValidationResult === 'string') {
      throw new BadRequestException({
        message: updateArtistDtoValidationResult,
      });
    }
    this.loggingService.verbose(`Searching for the artist with ID ${id}...`);
    const foundArtist = await this.artistRepository.findOneBy({ id });
    if (!foundArtist) {
      throw new NotFoundException({
        message: 'The artist with the specified ID was not found',
      });
    }
    await this.artistRepository.update(id, updateArtistDto);
    this.loggingService.verbose(
      `The artist with ID ${id} data was successfully updated...`,
    );
    return await this.artistRepository.findOneBy({ id });
  }

  async deleteArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException({ message: 'Invalid uuid' });
    }
    this.loggingService.verbose(`Searching for the artist with ID ${id}...`);
    const foundArtist = await this.artistRepository.findOneBy({ id });
    if (!foundArtist) {
      throw new NotFoundException({
        message: 'The artist with the specified ID was not found',
      });
    }
    await foundArtist.remove();
    this.loggingService.verbose(
      `Artist with ID ${id} was successfully deleted`,
    );
    return 'success';
  }
}
