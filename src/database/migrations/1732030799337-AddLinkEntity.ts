import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLinkEntity1732030799337 implements MigrationInterface {
  name = 'AddLinkEntity1732030799337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payload" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_ecf17f4a741d3c5ba0b4c5ab4b6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "links"`);
  }
}
