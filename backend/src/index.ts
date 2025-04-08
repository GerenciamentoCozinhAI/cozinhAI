// src/index.ts
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users";
import authRoutes from "./routes/auth";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // URL do seu frontend
    credentials: true, // se for usar cookies/autenticação
  })
);

app.use(express.json());
app.use("/users", usersRoutes);

app.use("/auth", authRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
