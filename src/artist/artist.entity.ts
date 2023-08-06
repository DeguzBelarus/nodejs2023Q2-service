import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { IArtistEntity } from '../types/entity-types';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';

@Entity('artists')
export class ArtistEntity extends BaseEntity implements IArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId, {
    onDelete: 'SET NULL',
  })
  albums: Array<AlbumEntity>;

  @OneToMany(() => TrackEntity, (track) => track.artistId, {
    onDelete: 'SET NULL',
  })
  tracks: Array<TrackEntity>;
}
