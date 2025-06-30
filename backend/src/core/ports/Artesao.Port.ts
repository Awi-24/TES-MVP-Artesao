import { Artesao } from "../entities/Artesao";

export interface ArtesaoPort {
  criar(artesao: Artesao): Promise<string>;
  buscarPorId(id: string): Promise<Artesao | null>;
  buscarPorEmail(body: {email: string, password: string}): Promise<Artesao | null>;
  atualizar(id: string, dadosAtualizados: Partial<Artesao>): Promise<void>;
  deletar(id: string): Promise<void>;
}
