import { MigrationInterface, QueryRunner } from "typeorm";

export class AddsServicesRelations1684524256385 implements MigrationInterface {
    name = 'AddsServicesRelations1684524256385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('Masculino', 'Feminino', 'Outro')`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('Cliente', 'Funcionário')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(300) NOT NULL, "email" character varying(300) NOT NULL, "password" character varying(300) NOT NULL, "phone" character varying(300) NOT NULL, "birth" date NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."services_status_enum" AS ENUM('Solicitado', 'Aceito', 'Recusado')`);
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "description" character varying(300) NOT NULL, "status" "public"."services_status_enum" NOT NULL DEFAULT 'Solicitado', "client" integer, "employee" integer, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_771c3a895c8594c72f930c94d51" FOREIGN KEY ("client") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_69f7502ec695f05e39c9d94534c" FOREIGN KEY ("employee") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_69f7502ec695f05e39c9d94534c"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_771c3a895c8594c72f930c94d51"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TYPE "public"."services_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    }

}
