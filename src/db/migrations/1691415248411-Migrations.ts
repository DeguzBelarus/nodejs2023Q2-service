import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691415248411 implements MigrationInterface {
    name = 'Migrations1691415248411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artist_Id" uuid, "album_Id" uuid, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artist_Id" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" uuid NOT NULL, CONSTRAINT "REL_82be0072b2a229420a57f08157" UNIQUE ("artistId"), CONSTRAINT "PK_a2808c56d3dc5d8882f9495e63d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumId" uuid NOT NULL, CONSTRAINT "REL_9fe28ffb3ad15145d7d3b08503" UNIQUE ("albumId"), CONSTRAINT "PK_8435921763b8a56c98b3700773d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trackId" uuid NOT NULL, CONSTRAINT "REL_6b0c7d487a618e839e987b3db1" UNIQUE ("trackId"), CONSTRAINT "PK_8d34ad5c55c7d5448fad8c4ced7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_40721e9cf02606148be5c818cf1" FOREIGN KEY ("artist_Id") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_3292c78c6ffd4ea252b7eb55901" FOREIGN KEY ("album_Id") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "albums" ADD CONSTRAINT "FK_7cc76f781c1fd8d909b10c8e1e4" FOREIGN KEY ("artist_Id") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_artists" ADD CONSTRAINT "FK_82be0072b2a229420a57f08157a" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_albums" ADD CONSTRAINT "FK_9fe28ffb3ad15145d7d3b08503f" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_tracks" ADD CONSTRAINT "FK_6b0c7d487a618e839e987b3db1d" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_tracks" DROP CONSTRAINT "FK_6b0c7d487a618e839e987b3db1d"`);
        await queryRunner.query(`ALTER TABLE "favorite_albums" DROP CONSTRAINT "FK_9fe28ffb3ad15145d7d3b08503f"`);
        await queryRunner.query(`ALTER TABLE "favorite_artists" DROP CONSTRAINT "FK_82be0072b2a229420a57f08157a"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP CONSTRAINT "FK_7cc76f781c1fd8d909b10c8e1e4"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_3292c78c6ffd4ea252b7eb55901"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_40721e9cf02606148be5c818cf1"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "favorite_tracks"`);
        await queryRunner.query(`DROP TABLE "favorite_albums"`);
        await queryRunner.query(`DROP TABLE "favorite_artists"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "tracks"`);
        await queryRunner.query(`DROP TABLE "artists"`);
    }

}
