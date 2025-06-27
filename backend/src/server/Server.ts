import express from "express";
<<<<<<< HEAD
import routes from "../routes/index"; // Rotas centralizadas
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

=======
import routes from "../routes/index"; // importa o index.ts de rotas
<<<<<<< HEAD:src/server/Server.ts
import logger from "../logger";
=======

import dotenv from "dotenv";
dotenv.config();

>>>>>>> main:backend/src/server/Server.ts
>>>>>>> 5a6879b336bfbb9eac1e0e4a54286f31668288a7
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
  logger.info(`Servidor rodando na porta ${PORT}`);
});
