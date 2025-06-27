import { Artesao } from "../entities/Artesao";

export interface ArtesaoPort {
  criar(artesao: Artesao): Promise<void>;
  buscarPorId(id: string): Promise<Artesao | null>;
  buscarPorEmail(email: string): Promise<Artesao | null>;
  atualizar(id: string, dadosAtualizados: Partial<Artesao>): Promise<void>;
  deletar(id: string): Promise<void>;
}
