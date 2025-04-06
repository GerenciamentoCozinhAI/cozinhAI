// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import usersRoutes from './routes/users';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/users', usersRoutes);

app.use('/auth', authRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
