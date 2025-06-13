import { Artesao } from "../entities/Artesao";
import { ArtesaoPort } from "../ports/Artesao.Port";

export class ArtesaoUseCase {
	constructor(private readonly artesaoRepo: ArtesaoPort) {}

	async criar(input: Omit<Artesao, "id" | "created_at" | "updated_at">): Promise<void> {
		const existente = await this.artesaoRepo.buscarPorEmail(input.email);
		if (existente) throw new Error("Email já cadastrado");

		const novo = new Artesao(
		"",
		input.nome,
		input.email,
		input.telefone,
		input.logradouro,
		input.cidade,
		input.estado,
		input.cep,
		input.senha_hash,
		new Date(),
		new Date()
		);

		await this.artesaoRepo.criar(novo);
	}

	async buscarPorId(id: string): Promise<Artesao | null> {
		return this.artesaoRepo.buscarPorId(id);
	}

	async atualizar(id: string, dados: Partial<Artesao>): Promise<void> {
		await this.artesaoRepo.atualizar(id, dados);
	}

	async deletar(id: string): Promise<void> {
		await this.artesaoRepo.deletar(id);
	}
}
