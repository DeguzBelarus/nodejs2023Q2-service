import {
  MinLength,
  IsInt,
  Min,
  ValidateIf,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ICreateAlbumDto, Nullable, IUpdateAlbumDto } from 'src/types/types';

export class CreateAlbumDto implements ICreateAlbumDto {
  @MinLength(1)
  name: string;

  @IsInt()
  @Min(1)
  year: number;

  @ValidateIf((object, value) => value !== null)
  @IsUUID(4)
  artistId: Nullable<string>;
}

export class UpdateAlbumDto implements IUpdateAlbumDto {
  @IsOptional()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  year: number;

  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  @IsUUID(4)
  artistId: Nullable<string>;
}
