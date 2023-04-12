/*
  Warnings:

  - You are about to drop the `_UserFollows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserFollows";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Followers" (
    "follower_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "followerID" INTEGER NOT NULL,
    "followingID" INTEGER NOT NULL,
    CONSTRAINT "Followers_followerID_fkey" FOREIGN KEY ("followerID") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Followers_followingID_fkey" FOREIGN KEY ("followingID") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
