import { ProdutoImagem } from "../entities/ProdutoImagem";

export interface ProdutoImagemPort {
  criar(imagem: ProdutoImagem): Promise<void>;
  listarPorProduto(produtoId: string): Promise<ProdutoImagem[]>;
  deletar(id: string): Promise<void>;
}
