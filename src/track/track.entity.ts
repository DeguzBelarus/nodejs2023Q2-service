import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ITrackEntity } from '../types/entity-types';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';

@Entity('tracks')
export class TrackEntity extends BaseEntity implements ITrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ name: 'artist_Id', nullable: true })
  artistId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artist_Id' })
  artist: ArtistEntity;

  @Column({ name: 'album_Id', nullable: true })
  albumId: string;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'album_Id' })
  album: AlbumEntity;
}
