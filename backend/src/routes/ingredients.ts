import { Router } from "express";
import {
  createIngredient,
  getAllIngredients,
  getIngredientByName,
  updateIngredient,
  deleteIngredient,
} from "../controllers/ingredientsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rotas públicas
router.get("/", getAllIngredients);
router.get("/:name", getIngredientByName);

// Rotas protegidas (autenticação necessária)
router.post("/", authMiddleware, createIngredient);
router.put("/:id", authMiddleware, updateIngredient);
router.delete("/:id", authMiddleware, deleteIngredient);

export default router;