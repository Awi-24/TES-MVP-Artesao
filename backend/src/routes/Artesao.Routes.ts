// src/routes/artesao.routes.js (ou similar)

import express from "express"
import { ArtesaoController } from "../adapters/controller/Artesao.Controller"

const artesaocontroller = new ArtesaoController()
const router = express.Router()

// Corrigindo rotas para evitar conflito id/email
router.post("/", artesaocontroller.criar)
router.get("/", artesaocontroller.buscarTodos)
router.get("/id/:id", artesaocontroller.buscarPorId)
router.post("/login/", artesaocontroller.buscarPorEmail)
router.put("/:id", artesaocontroller.atualizar)
router.delete("/:id", artesaocontroller.deletar)

export default router
