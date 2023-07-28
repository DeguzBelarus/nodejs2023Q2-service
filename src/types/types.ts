export type Nullable<T> = T | null;

export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface IUpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface ICreateArtistDto {
  name: string;
  grammy: boolean;
}

export interface IUpdateArtistDto {
  name?: string;
  grammy?: boolean;
}

export interface ICreateAlbumDto {
  name: string;
  year: number;
  artistId: Nullable<string>;
}

export interface IUpdateAlbumDto {
  name?: string;
  year?: number;
  artistId?: Nullable<string>;
}

export interface ICreateTrackDto {
  name: string;
  artistId: Nullable<string>;
  albumId: Nullable<string>;
  duration: number;
}

export interface IUpdateTrackDto {
  name?: string;
  artistId?: Nullable<string>;
  albumId?: Nullable<string>;
  duration?: number;
}
