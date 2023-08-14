import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AlbumService {
  constructor(
    private readonly dtoAlbumValidator: DtoAlbumValidatorService,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    return await this.albumRepository.find();
  }

  async getById(id: string) {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundAlbum = await this.albumRepository.findOneBy({ id });
    return foundAlbum ? foundAlbum : "entity doesn't exist";
  }

  async createAlbum(
    createAlbumDto: ICreateAlbumDto,
  ): Promise<CreateEntityResultType<AlbumEntity>> {
    const createAlbumDtoValidationResult =
      this.dtoAlbumValidator.createAlbumDtoValidate(createAlbumDto);
    if (typeof createAlbumDtoValidationResult === 'string') {
      return createAlbumDtoValidationResult;
    }
    const foundArtist = await this.artistRepository.findOneBy({
      id: createAlbumDto.artistId,
    });
    return !foundArtist
      ? 'invalid data'
      : await this.albumRepository.save(createAlbumDto);
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: IUpdateAlbumDto,
  ): Promise<UpdateEntityResultType<AlbumEntity>> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const updateAlbumDtoValidationResult =
      this.dtoAlbumValidator.updateAlbumDtoValidate(updateAlbumDto);
    if (typeof updateAlbumDtoValidationResult === 'string') {
      return updateAlbumDtoValidationResult;
    }
    const foundAlbum = await this.albumRepository.findOneBy({ id });
    if (!foundAlbum) return "entity doesn't exist";
    if (typeof updateAlbumDto.artistId === 'string') {
      const foundArtist = await this.artistRepository.findOneBy({
        id: updateAlbumDto.artistId,
      });
      if (!foundArtist) return 'invalid data';
    }
    await this.albumRepository.update(id, updateAlbumDto);
    return await this.albumRepository.findOneBy({ id });
  }

  async deleteAlbum(id: string) {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundAlbum = await this.albumRepository.findOneBy({ id });
    if (!foundAlbum) return "entity doesn't exist";
    await foundAlbum.remove();
    return 'success';
  }
}
