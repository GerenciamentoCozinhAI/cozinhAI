/*
  Warnings:

  - The `difficulty` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe_Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredients` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recipe_Ingredients" DROP CONSTRAINT "Recipe_Ingredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe_Ingredients" DROP CONSTRAINT "Recipe_Ingredients_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "ingredients" JSONB NOT NULL,
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" INTEGER NOT NULL DEFAULT 5;

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "Recipe_Ingredients";

-- DropEnum
DROP TYPE "Difficulty";
