import { MigrationInterface, QueryRunner } from 'typeorm';
import fs from 'fs';

const functions = fs.readFileSync(`${__dirname}/../../data.sql`, {
  encoding: 'utf-8',
});

export class Tables1713551988160 implements MigrationInterface {
  name = 'Tables1713551988160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "forgot_password" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "verification" integer NOT NULL, "firstUsed" boolean NOT NULL DEFAULT false, "finalUsed" boolean NOT NULL DEFAULT false, "expires" TIMESTAMP WITH TIME ZONE NOT NULL, "ip" character varying NOT NULL, "browser" character varying NOT NULL, "country" character varying NOT NULL, "ipChanged" character varying, "browserChanged" character varying, "countryChanged" character varying, CONSTRAINT "PK_9b1bedb8b9dd6834196533ee41b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "refreshToken" character varying NOT NULL, "ip" character varying NOT NULL, "browser" character varying NOT NULL, "country" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sale" ("id" SERIAL NOT NULL, "shiftId" integer, "posId" integer, "salesmanId" integer, CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shift" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "status" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "posId" integer, "cashRegisterId" integer, CONSTRAINT "PK_53071a6485a1e9dc75ec3db54b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cash_register" ("id" SERIAL NOT NULL, "ofd" character varying(200) NOT NULL, "printer" character varying(200) NOT NULL, "shopId" integer, "posId" integer, CONSTRAINT "PK_6278251c4df289cd438c5e11df8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pos" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "workspace" character varying NOT NULL, "shopId" integer, CONSTRAINT "PK_bd71782fccea4003b8088d4b373" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_8c03e90007cd9645242e594a041" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "price_template" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "formula" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a608d184f01e09a14023ccb11f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "receipt_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "price" integer NOT NULL DEFAULT '0', "receiptId" integer, "productId" integer, CONSTRAINT "PK_f83b5790116dde891f8176d79d4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recount" ("id" SERIAL NOT NULL, "status" integer NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "shopId" integer, "depotId" integer, "createdById" integer, CONSTRAINT "PK_ca5c0b482d690143d232562ae47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recount_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "actual_quantity" integer NOT NULL DEFAULT '0', "price" integer NOT NULL DEFAULT '0', "recountId" integer, "productId" integer, CONSTRAINT "PK_ecff70b4f759cbed31af78b3638" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "price" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "shopId" integer, "createdById" integer, CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "price_item" ("id" SERIAL NOT NULL, "retail_price" integer NOT NULL, "priceId" integer, "productId" integer, CONSTRAINT "PK_178cd9dbbbaa11cff1a0d7fdbb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "barcode" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "price" integer NOT NULL DEFAULT '0', "cost" integer NOT NULL DEFAULT '0', "groupId" integer, "priceTemplateId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "write_off_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "price" integer NOT NULL DEFAULT '0', "writeOffId" integer, "productId" integer, CONSTRAINT "PK_13f49b8abf06abbadb15c1c8aaa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "write_off" ("id" SERIAL NOT NULL, "based_on" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "shopId" integer, "depotId" integer, "createdById" integer, CONSTRAINT "PK_8035fdad376a86f15d73e2b7ab7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "depot" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "address" character varying(200) NOT NULL, "companyId" integer, "managerId" integer, CONSTRAINT "PK_90d6d40026ca8276389f30a0455" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shop" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "description" character varying(500) NOT NULL, "address" character varying(120) NOT NULL, "companyId" integer, "managerId" integer, "depotId" integer, CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "address" character varying(200) NOT NULL, "phone" character varying(100) NOT NULL, "email" character varying(120) NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "salesman" ("id" SERIAL NOT NULL, "personId" integer, "companyId" integer, CONSTRAINT "PK_f2a2da02f674976f194d7f9d5c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "person" ("id" SERIAL NOT NULL, "full_name" character varying(120) NOT NULL, "phone" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "address" character varying(200) NOT NULL, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "supplier" ("id" SERIAL NOT NULL, "personId" integer, "companyId" integer, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "receipt" ("id" SERIAL NOT NULL, "based_on" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "supplierId" integer, "shopId" integer, "depotId" integer, "createdById" integer, CONSTRAINT "PK_b4b9ec7d164235fbba023da9832" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" text array NOT NULL DEFAULT '{user}', "verification" integer NOT NULL, "verified" boolean NOT NULL DEFAULT false, "verificationExpires" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "loginAttempts" integer NOT NULL DEFAULT '0', "blockExpires" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_1ce8b709d320449ed2c7cb80e07" UNIQUE ("verification"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_5160ff913fd023836e0ff702d24" FOREIGN KEY ("shiftId") REFERENCES "shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_ff1040edd44792a1db5eb079055" FOREIGN KEY ("posId") REFERENCES "pos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_9d40ea87f812e0c166987b61efa" FOREIGN KEY ("salesmanId") REFERENCES "salesman"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shift" ADD CONSTRAINT "FK_a8f88d54658e10fbe9e79ae594c" FOREIGN KEY ("posId") REFERENCES "pos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shift" ADD CONSTRAINT "FK_4446c4cf4fc34126ed80791e34d" FOREIGN KEY ("cashRegisterId") REFERENCES "cash_register"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cash_register" ADD CONSTRAINT "FK_1baf8d0c5db06e503d65aea4b96" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cash_register" ADD CONSTRAINT "FK_4f54917ab6a290b0d9355dafe23" FOREIGN KEY ("posId") REFERENCES "pos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pos" ADD CONSTRAINT "FK_b67f174e3a4c18ac0150217fa23" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt_item" ADD CONSTRAINT "FK_12faad410888a899d6585579b83" FOREIGN KEY ("receiptId") REFERENCES "receipt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt_item" ADD CONSTRAINT "FK_fee08cb35fcb84d85676b529db6" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recount" ADD CONSTRAINT "FK_aa56d78796bfdf6009545bcd030" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recount" ADD CONSTRAINT "FK_893c5d2a631c3f247c1d681a9ba" FOREIGN KEY ("depotId") REFERENCES "depot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recount" ADD CONSTRAINT "FK_62cdc4e3dc3a2c54cc9869254f3" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recount_item" ADD CONSTRAINT "FK_fa6fa49ce3615dcf1eeab950115" FOREIGN KEY ("recountId") REFERENCES "recount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recount_item" ADD CONSTRAINT "FK_212430ee2d4215eededf3043547" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" ADD CONSTRAINT "FK_096836293d204f4d223f4c9d76e" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" ADD CONSTRAINT "FK_61f041b33d16d90b6f687200b90" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_item" ADD CONSTRAINT "FK_55a134eb3197e9c90d1d4198827" FOREIGN KEY ("priceId") REFERENCES "price"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_item" ADD CONSTRAINT "FK_d2c9ad0be34d717e42040bf41e9" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_9ff07d9b0075484eb946e79e567" FOREIGN KEY ("groupId") REFERENCES "product_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_8504f9d7130b5172a99cd26c29a" FOREIGN KEY ("priceTemplateId") REFERENCES "price_template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "write_off_item" ADD CONSTRAINT "FK_d814977e1e29d4671c5c465a299" FOREIGN KEY ("writeOffId") REFERENCES "write_off"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "write_off_item" ADD CONSTRAINT "FK_7d3d14851bd2a731fac23c9572a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "write_off" ADD CONSTRAINT "FK_b925ee8019314f8326ae0f28df3" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "write_off" ADD CONSTRAINT "FK_14e5af81dcedf450ba650850a7b" FOREIGN KEY ("depotId") REFERENCES "depot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "write_off" ADD CONSTRAINT "FK_72e2df4d94da7c5cd0bbd087f5c" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "depot" ADD CONSTRAINT "FK_dc1f73ca278ae654236c9342e03" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "depot" ADD CONSTRAINT "FK_d7bee9c6d0754b0d5ae38436c40" FOREIGN KEY ("managerId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD CONSTRAINT "FK_2ab54f2153d52a21bc688788f37" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD CONSTRAINT "FK_f919b232c6fbfef9bf7453b4fac" FOREIGN KEY ("managerId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD CONSTRAINT "FK_2c790cb80afe46bbcafe7d67c3a" FOREIGN KEY ("depotId") REFERENCES "depot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "salesman" ADD CONSTRAINT "FK_5e5f257f75fa12c6014d65b63aa" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "salesman" ADD CONSTRAINT "FK_fa8abe51bc7da69a77f0ad228ea" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD CONSTRAINT "FK_7670584dc4703e517a9c55b841c" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD CONSTRAINT "FK_860a390e2874a2150121f36ae9d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD CONSTRAINT "FK_acff0f13d84db55b7b3fe6b04c6" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD CONSTRAINT "FK_c33f068b2858fca8bba1ed8cff2" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD CONSTRAINT "FK_8eb66535cb2a5f04cbb35e8c3d2" FOREIGN KEY ("depotId") REFERENCES "depot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD CONSTRAINT "FK_9df16c8de7b577d240c557e73b7" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(functions);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "receipt" DROP CONSTRAINT "FK_9df16c8de7b577d240c557e73b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" DROP CONSTRAINT "FK_8eb66535cb2a5f04cbb35e8c3d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" DROP CONSTRAINT "FK_c33f068b2858fca8bba1ed8cff2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" DROP CONSTRAINT "FK_acff0f13d84db55b7b3fe6b04c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" DROP CONSTRAINT "FK_860a390e2874a2150121f36ae9d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" DROP CONSTRAINT "FK_7670584dc4703e517a9c55b841c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "salesman" DROP CONSTRAINT "FK_fa8abe51bc7da69a77f0ad228ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "salesman" DROP CONSTRAINT "FK_5e5f257f75fa12c6014d65b63aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" DROP CONSTRAINT "FK_2c790cb80afe46bbcafe7d67c3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" DROP CONSTRAINT "FK_f919b232c6fbfef9bf7453b4fac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" DROP CONSTRAINT "FK_2ab54f2153d52a21bc688788f37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "depot" DROP CONSTRAINT "FK_d7bee9c6d0754b0d5ae38436c40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "depot" DROP CONSTRAINT "FK_dc1f73ca278ae654236c9342e03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "write_off" DROP CONSTRAINT "FK_72e2df4d94da7c5cd0bbd087f5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "write_off" DROP CONSTRAINT "FK_14e5af81dcedf450ba650850a7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "write_off" DROP CONSTRAINT "FK_b925ee8019314f8326ae0f28df3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "write_off_item" DROP CONSTRAINT "FK_7d3d14851bd2a731fac23c9572a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "write_off_item" DROP CONSTRAINT "FK_d814977e1e29d4671c5c465a299"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_8504f9d7130b5172a99cd26c29a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_9ff07d9b0075484eb946e79e567"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_item" DROP CONSTRAINT "FK_d2c9ad0be34d717e42040bf41e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_item" DROP CONSTRAINT "FK_55a134eb3197e9c90d1d4198827"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" DROP CONSTRAINT "FK_61f041b33d16d90b6f687200b90"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" DROP CONSTRAINT "FK_096836293d204f4d223f4c9d76e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recount_item" DROP CONSTRAINT "FK_212430ee2d4215eededf3043547"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recount_item" DROP CONSTRAINT "FK_fa6fa49ce3615dcf1eeab950115"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recount" DROP CONSTRAINT "FK_62cdc4e3dc3a2c54cc9869254f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recount" DROP CONSTRAINT "FK_893c5d2a631c3f247c1d681a9ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recount" DROP CONSTRAINT "FK_aa56d78796bfdf6009545bcd030"`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt_item" DROP CONSTRAINT "FK_fee08cb35fcb84d85676b529db6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt_item" DROP CONSTRAINT "FK_12faad410888a899d6585579b83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pos" DROP CONSTRAINT "FK_b67f174e3a4c18ac0150217fa23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cash_register" DROP CONSTRAINT "FK_4f54917ab6a290b0d9355dafe23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cash_register" DROP CONSTRAINT "FK_1baf8d0c5db06e503d65aea4b96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shift" DROP CONSTRAINT "FK_4446c4cf4fc34126ed80791e34d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shift" DROP CONSTRAINT "FK_a8f88d54658e10fbe9e79ae594c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_9d40ea87f812e0c166987b61efa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_ff1040edd44792a1db5eb079055"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_5160ff913fd023836e0ff702d24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "receipt"`);
    await queryRunner.query(`DROP TABLE "supplier"`);
    await queryRunner.query(`DROP TABLE "person"`);
    await queryRunner.query(`DROP TABLE "salesman"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "shop"`);
    await queryRunner.query(`DROP TABLE "depot"`);
    await queryRunner.query(`DROP TABLE "write_off"`);
    await queryRunner.query(`DROP TABLE "write_off_item"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "price_item"`);
    await queryRunner.query(`DROP TABLE "price"`);
    await queryRunner.query(`DROP TABLE "recount_item"`);
    await queryRunner.query(`DROP TABLE "recount"`);
    await queryRunner.query(`DROP TABLE "receipt_item"`);
    await queryRunner.query(`DROP TABLE "price_template"`);
    await queryRunner.query(`DROP TABLE "product_group"`);
    await queryRunner.query(`DROP TABLE "pos"`);
    await queryRunner.query(`DROP TABLE "cash_register"`);
    await queryRunner.query(`DROP TABLE "shift"`);
    await queryRunner.query(`DROP TABLE "sale"`);
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`DROP TABLE "forgot_password"`);
  }
}
