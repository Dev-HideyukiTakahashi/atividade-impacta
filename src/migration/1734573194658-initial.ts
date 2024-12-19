import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1734573194658 implements MigrationInterface {
    name = 'Initial1734573194658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "authorId" integer)`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "postId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "tags" varchar NOT NULL, "surname" varchar NOT NULL, "completeName" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user_comments_comment" ("userId" integer NOT NULL, "commentId" integer NOT NULL, PRIMARY KEY ("userId", "commentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c6e76d049ed9560f4c08649b65" ON "user_comments_comment" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2e288a0c8c8963e1cb2614c731" ON "user_comments_comment" ("commentId") `);
        await queryRunner.query(`CREATE TABLE "author_comments_comment" ("authorId" integer NOT NULL, "commentId" integer NOT NULL, PRIMARY KEY ("authorId", "commentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_31f1a4a3b5f527c9c6227233ee" ON "author_comments_comment" ("authorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e1259851e91ce55965c06d0948" ON "author_comments_comment" ("commentId") `);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "authorId" integer, CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "text", "authorId") SELECT "id", "title", "text", "authorId" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
        await queryRunner.query(`CREATE TABLE "temporary_comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "postId" integer, CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comment"("id", "text", "postId") SELECT "id", "text", "postId" FROM "comment"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`ALTER TABLE "temporary_comment" RENAME TO "comment"`);
        await queryRunner.query(`DROP INDEX "IDX_c6e76d049ed9560f4c08649b65"`);
        await queryRunner.query(`DROP INDEX "IDX_2e288a0c8c8963e1cb2614c731"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_comments_comment" ("userId" integer NOT NULL, "commentId" integer NOT NULL, CONSTRAINT "FK_c6e76d049ed9560f4c08649b651" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_2e288a0c8c8963e1cb2614c7319" FOREIGN KEY ("commentId") REFERENCES "comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "commentId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_comments_comment"("userId", "commentId") SELECT "userId", "commentId" FROM "user_comments_comment"`);
        await queryRunner.query(`DROP TABLE "user_comments_comment"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_comments_comment" RENAME TO "user_comments_comment"`);
        await queryRunner.query(`CREATE INDEX "IDX_c6e76d049ed9560f4c08649b65" ON "user_comments_comment" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2e288a0c8c8963e1cb2614c731" ON "user_comments_comment" ("commentId") `);
        await queryRunner.query(`DROP INDEX "IDX_31f1a4a3b5f527c9c6227233ee"`);
        await queryRunner.query(`DROP INDEX "IDX_e1259851e91ce55965c06d0948"`);
        await queryRunner.query(`CREATE TABLE "temporary_author_comments_comment" ("authorId" integer NOT NULL, "commentId" integer NOT NULL, CONSTRAINT "FK_31f1a4a3b5f527c9c6227233eec" FOREIGN KEY ("authorId") REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_e1259851e91ce55965c06d09489" FOREIGN KEY ("commentId") REFERENCES "comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("authorId", "commentId"))`);
        await queryRunner.query(`INSERT INTO "temporary_author_comments_comment"("authorId", "commentId") SELECT "authorId", "commentId" FROM "author_comments_comment"`);
        await queryRunner.query(`DROP TABLE "author_comments_comment"`);
        await queryRunner.query(`ALTER TABLE "temporary_author_comments_comment" RENAME TO "author_comments_comment"`);
        await queryRunner.query(`CREATE INDEX "IDX_31f1a4a3b5f527c9c6227233ee" ON "author_comments_comment" ("authorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e1259851e91ce55965c06d0948" ON "author_comments_comment" ("commentId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_e1259851e91ce55965c06d0948"`);
        await queryRunner.query(`DROP INDEX "IDX_31f1a4a3b5f527c9c6227233ee"`);
        await queryRunner.query(`ALTER TABLE "author_comments_comment" RENAME TO "temporary_author_comments_comment"`);
        await queryRunner.query(`CREATE TABLE "author_comments_comment" ("authorId" integer NOT NULL, "commentId" integer NOT NULL, PRIMARY KEY ("authorId", "commentId"))`);
        await queryRunner.query(`INSERT INTO "author_comments_comment"("authorId", "commentId") SELECT "authorId", "commentId" FROM "temporary_author_comments_comment"`);
        await queryRunner.query(`DROP TABLE "temporary_author_comments_comment"`);
        await queryRunner.query(`CREATE INDEX "IDX_e1259851e91ce55965c06d0948" ON "author_comments_comment" ("commentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_31f1a4a3b5f527c9c6227233ee" ON "author_comments_comment" ("authorId") `);
        await queryRunner.query(`DROP INDEX "IDX_2e288a0c8c8963e1cb2614c731"`);
        await queryRunner.query(`DROP INDEX "IDX_c6e76d049ed9560f4c08649b65"`);
        await queryRunner.query(`ALTER TABLE "user_comments_comment" RENAME TO "temporary_user_comments_comment"`);
        await queryRunner.query(`CREATE TABLE "user_comments_comment" ("userId" integer NOT NULL, "commentId" integer NOT NULL, PRIMARY KEY ("userId", "commentId"))`);
        await queryRunner.query(`INSERT INTO "user_comments_comment"("userId", "commentId") SELECT "userId", "commentId" FROM "temporary_user_comments_comment"`);
        await queryRunner.query(`DROP TABLE "temporary_user_comments_comment"`);
        await queryRunner.query(`CREATE INDEX "IDX_2e288a0c8c8963e1cb2614c731" ON "user_comments_comment" ("commentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c6e76d049ed9560f4c08649b65" ON "user_comments_comment" ("userId") `);
        await queryRunner.query(`ALTER TABLE "comment" RENAME TO "temporary_comment"`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "postId" integer)`);
        await queryRunner.query(`INSERT INTO "comment"("id", "text", "postId") SELECT "id", "text", "postId" FROM "temporary_comment"`);
        await queryRunner.query(`DROP TABLE "temporary_comment"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "authorId" integer)`);
        await queryRunner.query(`INSERT INTO "post"("id", "title", "text", "authorId") SELECT "id", "title", "text", "authorId" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
        await queryRunner.query(`DROP INDEX "IDX_e1259851e91ce55965c06d0948"`);
        await queryRunner.query(`DROP INDEX "IDX_31f1a4a3b5f527c9c6227233ee"`);
        await queryRunner.query(`DROP TABLE "author_comments_comment"`);
        await queryRunner.query(`DROP INDEX "IDX_2e288a0c8c8963e1cb2614c731"`);
        await queryRunner.query(`DROP INDEX "IDX_c6e76d049ed9560f4c08649b65"`);
        await queryRunner.query(`DROP TABLE "user_comments_comment"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
