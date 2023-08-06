import { Injectable } from '@nestjs/common';
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

@Injectable()
export class ArtistService {
  constructor(
    private readonly dtoArtistValidator: DtoArtistValidatorService,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    return await this.artistRepository.find();
  }

  async getById(id: string) {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundArtist = await this.artistRepository.findOneBy({ id });
    return foundArtist ? foundArtist : "entity doesn't exist";
  }

  async createArtist(
    createArtistDto: ICreateArtistDto,
  ): Promise<CreateEntityResultType<ArtistEntity>> {
    const createArtistDtoValidationResult =
      this.dtoArtistValidator.createArtistDtoValidate(createArtistDto);
    if (typeof createArtistDtoValidationResult === 'string') {
      return createArtistDtoValidationResult;
    }
    return await this.artistRepository.save(createArtistDto);
  }

  async updateArtist(
    id: string,
    updateArtistDto: IUpdateArtistDto,
  ): Promise<UpdateEntityResultType<ArtistEntity>> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const updateArtistDtoValidationResult =
      this.dtoArtistValidator.updateArtistDtoValidate(updateArtistDto);
    if (typeof updateArtistDtoValidationResult === 'string') {
      return updateArtistDtoValidationResult;
    }
    const foundArtist = await this.artistRepository.findOneBy({ id });
    if (!foundArtist) return "entity doesn't exist";
    await this.artistRepository.update(id, updateArtistDto);
    return await this.artistRepository.findOneBy({ id });
  }

  async deleteArtist(id: string) {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundArtist = await this.artistRepository.findOneBy({ id });
    if (!foundArtist) return "entity doesn't exist";
    await foundArtist.remove();
    return 'success';
  }
}
