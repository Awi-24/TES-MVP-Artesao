import { Request, Response } from "express";
import { ProdutoUseCase } from "../../core/useCase/Produto.UseCase";
import { ProdutoRepository } from "../repository/Produto.Repository";

export class ProdutoController {
	constructor(private readonly produtoUseCase = new ProdutoUseCase(new ProdutoRepository())) {}

	criar = async (req: Request, res: Response): Promise<void> => {
		await this.produtoUseCase.criar(req.body);
		res.status(201).json({ message: "Produto criado com sucesso" });
	};

	buscarPorId = async (req: Request, res: Response): Promise<void> => {
		const id = req.params.id;
		const produto = await this.produtoUseCase.buscarPorId(id);
		if (!produto) {
		res.status(404).json({ message: "Produto não encontrado" });
		return;
		}
		res.json(produto);
	};

	listarPorArtesao = async (req: Request, res: Response): Promise<void> => {
		const artesaoId = req.params.artesaoId;
		const produtos = await this.produtoUseCase.listarPorArtesao(artesaoId);
		res.json(produtos);
	};

	atualizar = async (req: Request, res: Response): Promise<void> => {
		const id = req.params.id;
		await this.produtoUseCase.atualizar(id, req.body);
		res.json({ message: "Produto atualizado com sucesso" });
	};

	deletar = async (req: Request, res: Response): Promise<void> => {
		const id = req.params.id;
		await this.produtoUseCase.deletar(id);
		res.json({ message: "Produto deletado com sucesso" });
	};
}
