import { MigrationInterface, QueryRunner } from 'typeorm';

export class DataSource implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`insert into public.user (
                                        id, 
                                        fullName, 
                                        email, 
                                        password, 
                                        role, 
                                        verification, 
                                        verified, 
                                        verificationExpires, 
                                        loginAttempts, 
                                        blockExpires, 
                                        createdAt, 
                                        updatedAt)
                                    values  (
                                        8, 
                                        'Kutman Smanov', 
                                        'kutman.kochkorbay@etibakir.com.tr', 
                                        '$manov', 
                                        '{user}', 
                                        920604, 
                                        true, 
                                        '2023-03-10 23:14:07.826000', 
                                        0, 
                                        '2023-03-10 19:14:07.828552', 
                                        '2023-03-10 19:14:07.828552', 
                                        '2023-03-10 19:43:16.881483');`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
