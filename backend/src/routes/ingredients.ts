import { Router } from "express";
import {
  createIngredient,
  getAllIngredients,
  getIngredientByName,
  searchIngredients,
  updateIngredient,
  deleteIngredient,
} from "../controllers/ingredientsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rotas públicas
router.get("/search", searchIngredients);
router.get("/:name", getIngredientByName);
router.get("/", getAllIngredients);
// Rotas protegidas (autenticação necessária)
router.post("/", authMiddleware, createIngredient);
router.put("/:id", authMiddleware, updateIngredient);
router.delete("/:id", authMiddleware, deleteIngredient);

export default router;