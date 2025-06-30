import express from "express";
import { ProdutoController } from "../adapters/controller/Produto.Controller";

const ptodutocontroller = new ProdutoController()

const router = express.Router();

router.post("/", ptodutocontroller.criar);
router.get("/", ptodutocontroller.buscarTodos);
router.get("/:id", ptodutocontroller.buscarPorId);
router.put("/:id", ptodutocontroller.atualizar);
router.delete("/:id", ptodutocontroller.deletar);

export default router;