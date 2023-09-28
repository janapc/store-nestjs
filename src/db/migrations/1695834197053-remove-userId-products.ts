import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserIdProducts1695834197053 implements MigrationInterface {
    name = 'RemoveUserIdProducts1695834197053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "user_id" character varying NOT NULL`);
    }

}
