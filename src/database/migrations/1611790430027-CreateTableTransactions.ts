import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateTableTransactions1611790430027 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE [dbo].[transactions](
      [id] [int] IDENTITY(1,1) NOT NULL,
      [title] [varchar](100) NOT NULL,
      [type] [varchar](100) NOT NULL,
      [value] [decimal](10, 2) NOT NULL DEFAULT 0,
      [created_at] [smalldatetime] NOT NULL DEFAULT GETDATE(),
      [updated_at] [smalldatetime] NOT NULL DEFAULT GETDATE(),
     CONSTRAINT [PK_transactions] PRIMARY KEY CLUSTERED
    (
      [id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE transactions`);
  }

  // public async up(queryRunner: QueryRunner): Promise<void> {

  //   await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  //   await queryRunner.createTable(
  //     new Table({
  //       name: 'transactions',
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
  //           name: 'type',
  //           type: 'varchar',
  //         },
  //         {
  //           name: 'value',
  //           type: 'decimal',
  //           precision: 10,
  //           scale: 2
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
  //   await queryRunner.dropTable('transactions');
  // }

}
