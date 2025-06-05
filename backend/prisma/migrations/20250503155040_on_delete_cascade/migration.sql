-- DropForeignKey
ALTER TABLE "Recipe_Ingredients" DROP CONSTRAINT "Recipe_Ingredients_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "Recipe_Ingredients" ADD CONSTRAINT "Recipe_Ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
