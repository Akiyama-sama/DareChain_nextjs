-- CreateTable
CREATE TABLE "Idea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chineseContent" TEXT NOT NULL,
    "englishContent" TEXT,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
