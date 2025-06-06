import { ProdutoImagem } from "../../core/entities/ProdutoImagem";
import { ProdutoImagemPort } from "../../core/ports/ProdutoImagem.Port";

export class ProdutoImagemRepository implements ProdutoImagemPort {
	private imagens: ProdutoImagem[] = [];

	async criar(imagem: ProdutoImagem): Promise<void> {
		this.imagens.push(imagem);
	}

	async listarPorProduto(produtoId: number): Promise<ProdutoImagem[]> {
		return this.imagens.filter(i => i.produto_id === produtoId);
	}

	async deletar(id: number): Promise<void> {
		this.imagens = this.imagens.filter(i => i.id !== id);
	}
}
