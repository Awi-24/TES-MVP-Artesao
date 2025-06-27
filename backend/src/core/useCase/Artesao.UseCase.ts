import { Artesao } from "../entities/Artesao";
import { ArtesaoPort } from "../ports/Artesao.Port";

export class ArtesaoUseCase {
	constructor(private readonly artesaoRepo: ArtesaoPort) {}

	async criar(input: Omit<Artesao, "id" | "updated_at" | "created_at">): Promise<void> {
		console.log("entrou")
		const existente = await this.artesaoRepo.buscarPorEmail(input.email);
		console.log("aqui")
		if (existente) throw new Error("Email já cadastrado");
		
		console.log("input", input)
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

	async buscarPorEmail(email: string): Promise<Omit<Artesao, "id" | "updated_at" | "created_at"> | null> {
		return this.artesaoRepo.buscarPorEmail(email);
	}

	async atualizar(id: string, dados: Partial<Artesao>): Promise<void> {
		await this.artesaoRepo.atualizar(id, dados);
	}

	async deletar(id: string): Promise<void> {
		await this.artesaoRepo.deletar(id);
	}
}
