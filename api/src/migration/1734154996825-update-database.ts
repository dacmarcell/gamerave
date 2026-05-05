import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabase1734154996825 implements MigrationInterface {
    name = 'UpdateDatabase1734154996825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "UQ_5405a7b364f3ad177f77743c402"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "review" ADD "title" character varying(30) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "review" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "UQ_5405a7b364f3ad177f77743c402" UNIQUE ("title")`);
    }

}
