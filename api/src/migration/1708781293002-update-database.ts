import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDatabase1708781293002 implements MigrationInterface {
  name = 'UpdateDatabase1708781293002';

  async up(queryRunner: QueryRunner) {
    await queryRunner.query(
      `CREATE TABLE "review" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "likes" integer NOT NULL, "gameId" integer, CONSTRAINT "UQ_5405a7b364f3ad177f77743c402" UNIQUE ("title"), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "game" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "likes" integer NOT NULL, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5d1e08e04b97aa06d671cd5840" ON "game" ("name") `
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_ef6fa2aeb98fd27d0a8d71735b6" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_ef6fa2aeb98fd27d0a8d71735b6"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5d1e08e04b97aa06d671cd5840"`
    );
    await queryRunner.query(`DROP TABLE "game"`);
    await queryRunner.query(`DROP TABLE "review"`);
  }
}
