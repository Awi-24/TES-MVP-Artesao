import { Request, Response } from "express";
import { ProdutoImagemUseCase } from "../../core/useCase/ProdutoImagem.UseCase";
import { ProdutoImagemRepository } from "../repository/ProdutoImagem.Repository";

export class ProdutoImagemController {
	constructor(private readonly imagemUseCase = new ProdutoImagemUseCase(new ProdutoImagemRepository())) {}

	criar = async (req: Request, res: Response): Promise<void> => {
		await this.imagemUseCase.criar(req.body);
		res.status(201).json({ message: "Imagem criada com sucesso" });
	};

	listarPorProduto = async (req: Request, res: Response): Promise<void> => {
		const produtoId = Number(req.params.produtoId);
		const imagens = await this.imagemUseCase.listarPorProduto(produtoId);
		res.json(imagens);
	};

	deletar = async (req: Request, res: Response): Promise<void> => {
		const id = Number(req.params.id);
		await this.imagemUseCase.deletar(id);
		res.json({ message: "Imagem deletada com sucesso" });
	};
}
