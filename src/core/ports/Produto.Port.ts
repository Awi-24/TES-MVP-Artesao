import { Produto } from "../entities/Produto";

export interface ProdutoPort {
  criar(produto: Produto): Promise<void>;
  buscarPorId(id: string): Promise<Produto | null>;
  listarPorArtesao(artesaoId: string): Promise<Produto[]>;
  atualizar(id: string, dadosAtualizados: Partial<Produto>): Promise<void>;
  deletar(id: string): Promise<void>;
}
