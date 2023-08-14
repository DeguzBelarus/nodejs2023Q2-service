import { MinLength, IsBoolean, IsOptional } from 'class-validator';
import { ICreateArtistDto, IUpdateArtistDto } from 'src/types/types';

export class CreateArtistDto implements ICreateArtistDto {
  @MinLength(1)
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto implements IUpdateArtistDto {
  @IsOptional()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
