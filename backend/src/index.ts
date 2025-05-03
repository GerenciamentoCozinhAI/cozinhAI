// src/index.ts
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import recipesRoutes from "./routes/recipes";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

app.use(express.json());
app.use("/users", usersRoutes);

app.use("/auth", authRoutes);

app.use("/recipes",recipesRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
