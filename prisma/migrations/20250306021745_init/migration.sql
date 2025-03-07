-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "image" TEXT NOT NULL,
    "githubLink" TEXT NOT NULL,
    "demoLink" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "achievement" TEXT[],
    "pos" INTEGER NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "whoami" TEXT NOT NULL,
    "journey" TEXT NOT NULL,
    "yearsExperience" INTEGER NOT NULL,
    "projectCompleted" INTEGER NOT NULL,
    "happyClient" INTEGER NOT NULL,
    "technologies" INTEGER NOT NULL,
    "socialMedia" JSONB,
    "contactInfo" JSONB,
    "allowRegister" BOOLEAN NOT NULL DEFAULT false,
    "code" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Work_pos_key" ON "Work"("pos");
