import express from "express";
import { ProdutoImagemController } from "../adapters/controller/ProdutoImagem.Controller";

const ptodutoimagemcontroller = new ProdutoImagemController()

const router = express.Router();

router.post("/", ptodutoimagemcontroller.criar);
router.get("/:id", ptodutoimagemcontroller.listarPorProduto);
router.delete("/:id", ptodutoimagemcontroller.deletar);

export default router;