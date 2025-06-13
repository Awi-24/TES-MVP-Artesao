import { Produto } from "../entities/Produto";
import { ProdutoPort } from "../ports/Produto.Port";

export class ProdutoUseCase {
	constructor(private readonly produtoRepo: ProdutoPort) {}

	async criar(input: Omit<Produto, "id" | "created_at" | "updated_at">): Promise<void> {
		const produto = new Produto(
		"",
		input.artesao_id,
		input.nome,
		input.descricao,
		input.preco,
		input.quantidade,
		input.categoria,
		new Date(),
		new Date()
		);

		await this.produtoRepo.criar(produto);
	}

	async buscarPorId(id: string): Promise<Produto | null> {
		return this.produtoRepo.buscarPorId(id);
	}

	async listarPorArtesao(artesaoId: string): Promise<Produto[]> {
		return this.produtoRepo.listarPorArtesao(artesaoId);
	}

	async atualizar(id: string, dados: Partial<Produto>): Promise<void> {
		await this.produtoRepo.atualizar(id, dados);
	}

	async deletar(id: string): Promise<void> {
		await this.produtoRepo.deletar(id);
	}
}
