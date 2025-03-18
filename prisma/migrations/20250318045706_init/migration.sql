-- CreateTable
CREATE TABLE "Idea" (
    "id" UUID NOT NULL,
    "chineseContent" TEXT NOT NULL,
    "englishContent" TEXT,
    "createTime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);
