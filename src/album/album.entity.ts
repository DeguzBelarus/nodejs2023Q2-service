import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { IAlbumEntity } from '../types/entity-types';
import { TrackEntity } from '../track/track.entity';
import { ArtistEntity } from '../artist/artist.entity';

@Entity('albums')
export class AlbumEntity extends BaseEntity implements IAlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToMany(() => TrackEntity, (track) => track.albumId, {
    onDelete: 'SET NULL',
  })
  tracks: Array<TrackEntity>;

  @Column({ name: 'artist_Id', nullable: true })
  artistId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artist_Id' })
  artist: ArtistEntity;
}
