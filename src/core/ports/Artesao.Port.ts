import { Artesao } from "../entities/Artesao";

export interface ArtesaoPort {
  criar(artesao: Artesao): Promise<void>;
  buscarPorId(id: number): Promise<Artesao | null>;
  buscarPorEmail(email: string): Promise<Artesao | null>;
  atualizar(id: number, dadosAtualizados: Partial<Artesao>): Promise<void>;
  deletar(id: number): Promise<void>;
}
