import express from "express";
import artesaoRoutes from "./Artesao.Routes";
import produtoRoutes from "./Produto.Routes";
import produtoImagemRoutes from "./ProdutoImagem.Routes.ts";

const router = express.Router();

// Aqui agrupamos todas as rotas
router.use("/artesao", artesaoRoutes);
router.use("/produto", produtoRoutes);
router.use("/produto-imagens", produtoImagemRoutes);

export default router;
