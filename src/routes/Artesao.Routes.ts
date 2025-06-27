import express from "express";
import { ArtesaoController } from "../adapters/controller/Artesao.Controller";

const artesaocontroller = new ArtesaoController()

const router = express.Router();

router.post("/", artesaocontroller.criar);
router.get("/:id", artesaocontroller.buscarPorId);
router.put("/:id", artesaocontroller.atualizar);
router.delete("/:id", artesaocontroller.deletar);

export default router;