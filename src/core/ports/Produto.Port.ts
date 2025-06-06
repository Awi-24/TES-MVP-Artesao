import { Produto } from "../entities/Produto";

export interface ProdutoPort {
  criar(produto: Produto): Promise<void>;
  buscarPorId(id: number): Promise<Produto | null>;
  listarPorArtesao(artesaoId: number): Promise<Produto[]>;
  atualizar(id: number, dadosAtualizados: Partial<Produto>): Promise<void>;
  deletar(id: number): Promise<void>;
}
