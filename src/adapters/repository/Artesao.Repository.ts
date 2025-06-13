// repository/ArtesaoRepository.ts
import { Artesao } from "../../core/entities/Artesao";
import { ArtesaoPort } from "../../core/ports/Artesao.Port";

export class ArtesaoRepository implements ArtesaoPort {
	private artesoes: Artesao[] = [];

	async criar(artesao: Artesao): Promise<void> {
		this.artesoes.push(artesao);
	}

	async buscarPorId(id: string): Promise<Artesao | null> {
		return this.artesoes.find(a => a.id === id) ?? null;
	}

	async buscarPorEmail(email: string): Promise<Artesao | null> {
		return this.artesoes.find(a => a.email === email) ?? null;
	}

	async atualizar(id: string, dados: Partial<Artesao>): Promise<void> {
		const index = this.artesoes.findIndex(a => a.id === id);
		if (index === -1) return;
		this.artesoes[index] = { ...this.artesoes[index], ...dados };
	}

	async deletar(id: string): Promise<void> {
		this.artesoes = this.artesoes.filter(a => a.id !== id);
	}
}
