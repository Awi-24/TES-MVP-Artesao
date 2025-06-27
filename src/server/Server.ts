import express from "express";
import routes from "../routes/index"; // importa o index.ts de rotas
import logger from "../logger";
const app = express();

app.use(express.json());
app.use(routes); // aplica todas as rotas centralizadas

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
