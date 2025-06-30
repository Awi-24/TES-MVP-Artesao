import { Request, Response } from "express";
import { ArtesaoUseCase } from "../../core/useCase/Artesao.UseCase";
import { ArtesaoRepository } from "../repository/Artesao.Repository";


export class ArtesaoController {
	constructor(private readonly artesaoUseCase = new ArtesaoUseCase(new ArtesaoRepository())){}

	criar = async (req: Request, res: Response): Promise<void> => {
		try {
			console.log(req.body)
			const id = await this.artesaoUseCase.criar(req.body);
			res.status(201).json({ message: "Artesão criado com sucesso", id: id });
			} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};

	buscarPorId = async (req: Request, res: Response): Promise<void> => {
		const id = req.params.id;
		const artesao = await this.artesaoUseCase.buscarPorId(id);
		if (!artesao) {
		res.status(404).json({ message: "Artesão não encontrado" });
		return;
		}
		res.json(artesao);
	};

	buscarPorEmail = async (req: Request, res: Response): Promise<void> => {
		const body = req.body;
		console.log(body)
		const artesao = await this.artesaoUseCase.buscarPorEmail(body);
		if (!artesao) {
			res.status(404).json({ message: "Artesão não encontrado" });
			return;
		}
		res.json(artesao);
	};

	atualizar = async (req: Request, res: Response): Promise<void> => {
		const id = req.params.id;
		await this.artesaoUseCase.atualizar(id, req.body);
		res.json({ message: "Artesão atualizado com sucesso" });
	};

	deletar = async (req: Request, res: Response): Promise<void> => {
		const id = req.params.id;
		await this.artesaoUseCase.deletar(id);
		res.json({ message: "Artesão deletado com sucesso" });
	};
}
