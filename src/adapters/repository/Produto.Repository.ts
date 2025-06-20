import { Produto } from "../../core/entities/Produto";
import { ProdutoPort } from "../../core/ports/Produto.Port";

export class ProdutoRepository implements ProdutoPort {
	private produtos: Produto[] = [];

	async criar(produto: Produto): Promise<void> {
		this.produtos.push(produto);
	}

	async buscarPorId(id: string): Promise<Produto | null> {
		return this.produtos.find(p => p.id === id) ?? null;
	}

	async listarPorArtesao(artesaoId: string): Promise<Produto[]> {
		return this.produtos.filter(p => p.artesao_id === artesaoId);
	}

	async atualizar(id: string, dados: Partial<Produto>): Promise<void> {
		const index = this.produtos.findIndex(p => p.id === id);
		if (index === -1) return;
		this.produtos[index] = { ...this.produtos[index], ...dados };
	}

	async deletar(id: string): Promise<void> {
		this.produtos = this.produtos.filter(p => p.id !== id);
	}
}
