import express from "express";
import routes from "../routes/index"; // importa o index.ts de rotas
<<<<<<< HEAD:src/server/Server.ts
import logger from "../logger";
=======

import dotenv from "dotenv";
dotenv.config();

>>>>>>> main:backend/src/server/Server.ts
const app = express();

app.use(express.json());
app.use(routes); // aplica todas as rotas centralizadas

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
