import { ProdutoImagem } from "../entities/ProdutoImagem";

export interface ProdutoImagemPort {
  criar(imagem: ProdutoImagem): Promise<void>;
  listarPorProduto(produtoId: number): Promise<ProdutoImagem[]>;
  deletar(id: number): Promise<void>;
}
