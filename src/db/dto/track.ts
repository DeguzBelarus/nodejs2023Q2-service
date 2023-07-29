import {
  MinLength,
  IsInt,
  Min,
  ValidateIf,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ICreateTrackDto, Nullable, IUpdateTrackDto } from 'src/types/types';

export class CreateTrackDto implements ICreateTrackDto {
  @MinLength(1)
  name: string;

  @IsInt()
  @Min(1)
  duration: number;

  @ValidateIf((object, value) => value !== null)
  @IsUUID(4)
  artistId: Nullable<string>;

  @ValidateIf((object, value) => value !== null)
  @IsUUID(4)
  albumId: Nullable<string>;
}

export class UpdateTrackDto implements IUpdateTrackDto {
  @IsOptional()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  duration: number;

  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  @IsUUID(4)
  artistId: Nullable<string>;

  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  @IsUUID(4)
  albumId: Nullable<string>;
}
