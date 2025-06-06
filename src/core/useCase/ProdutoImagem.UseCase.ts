import { ProdutoImagem } from "../entities/ProdutoImagem";
import { ProdutoImagemPort } from "../ports/ProdutoImagem.Port";

export class ProdutoImagemUseCase {
	constructor(private readonly imagemRepo: ProdutoImagemPort) {}

	async criar(input: Omit<ProdutoImagem, "id" | "created_at">): Promise<void> {
		const imagem = new ProdutoImagem(
		Date.now(),
		input.produto_id,
		input.url,
		input.descricao,
		new Date()
		);

		await this.imagemRepo.criar(imagem);
	}

	async listarPorProduto(produtoId: number): Promise<ProdutoImagem[]> {
		return this.imagemRepo.listarPorProduto(produtoId);
	}

	async deletar(id: number): Promise<void> {
		await this.imagemRepo.deletar(id);
	}
}
