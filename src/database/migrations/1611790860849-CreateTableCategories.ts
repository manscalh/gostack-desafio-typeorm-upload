import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateTableCategories1611790860849 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE [dbo].[categories](
      [id] [int] IDENTITY(1,1) NOT NULL,
      [title] [varchar](100) NOT NULL,
      [created_at] [smalldatetime] NOT NULL DEFAULT GETDATE(),
      [updated_at] [smalldatetime] NOT NULL DEFAULT GETDATE(),
     CONSTRAINT [PK_categories] PRIMARY KEY CLUSTERED
    (
      [id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE categories
    `);
  }

  // public async up(queryRunner: QueryRunner): Promise<void> {
  //   await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  //   await queryRunner.createTable(
  //     new Table({
  //       name: 'categories',
  //       columns: [
  //         {
  //           name: 'id',
  //           type: 'uuid',
  //           isPrimary: true,
  //           generationStrategy: 'uuid',
  //           default: 'uuid_generate_v4()'
  //         },
  //         {
  //           name: 'title',
  //           type: 'varchar'
  //         },
  //         {
  //           name: 'created_at',
  //           type: 'timestamp',
  //           default: 'now()',
  //         },
  //         {
  //           name: 'updated_at',
  //           type: 'timestamp',
  //           default: 'now()',
  //         }
  //       ]
  //     })
  //   );
  // }

  // public async down(queryRunner: QueryRunner): Promise<void> {
  //   await queryRunner.dropTable('categories');
  // }

}
