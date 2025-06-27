import express from "express";
import routes from "../routes/index"; // Rotas centralizadas
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

const app = express();

// ✅ CORS deve vir antes das rotas e do body parser
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Body parser JSON
app.use(express.json());

// ✅ Suas rotas
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
