import { Artesao } from "../entities/Artesao";
import { ArtesaoPort } from "../ports/Artesao.Port";

export class ArtesaoUseCase {
	constructor(private readonly artesaoRepo: ArtesaoPort) {}

	async criar(input: Omit<Artesao, "id" | "created_at" | "updated_at">): Promise<void> {
		const existente = await this.artesaoRepo.buscarPorEmail(input.email);
		if (existente) throw new Error("Email já cadastrado");

		const novo = new Artesao(
		Date.now(),
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

	async buscarPorId(id: number): Promise<Artesao | null> {
		return this.artesaoRepo.buscarPorId(id);
	}

	async atualizar(id: number, dados: Partial<Artesao>): Promise<void> {
		await this.artesaoRepo.atualizar(id, dados);
	}

	async deletar(id: number): Promise<void> {
		await this.artesaoRepo.deletar(id);
	}
}
