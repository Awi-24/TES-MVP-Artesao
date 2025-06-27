import { Artesao } from "../entities/Artesao";
import { ArtesaoPort } from "../ports/Artesao.Port";
import logger from "../../logger";

export class ArtesaoUseCase {
	constructor(private readonly artesaoRepo: ArtesaoPort) {}

<<<<<<< HEAD
	async criar(input: Omit<Artesao, "id" | "updated_at" | "created_at">): Promise<void> {
		console.log("entrou")
		const existente = await this.artesaoRepo.buscarPorEmail(input.email);
		console.log("aqui")
		if (existente) throw new Error("Email já cadastrado");
		
		console.log("input", input)
=======
	async criar(input: Omit<Artesao, "id" | "created_at" | "updated_at">): Promise<void> {
		logger.info(`Iniciando caso de uso ArtesaoUseCase.criar para email: ${input.email}`);
		try {
			const existente = await this.artesaoRepo.buscarPorEmail(input.email);
			if (existente) {
				logger.warn(`Tentativa de criar Artesao com email já cadastrado: ${input.email}`);
				throw new Error("Email já cadastrado");
			}

>>>>>>> 5a6879b336bfbb9eac1e0e4a54286f31668288a7
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
			logger.info(`Artesao criado com sucesso. ID: ${novo.id}, Email: ${novo.email}`);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(`Erro no caso de uso ArtesaoUseCase.criar para email ${input.email}: ${error.message}`, { stack: error.stack });
			} else {
				logger.error(`Erro no caso de uso ArtesaoUseCase.criar para email ${input.email}: ${JSON.stringify(error)}`);
			}
			throw error;
		}
	}

	async buscarPorId(id: string): Promise<Artesao | null> {
		logger.debug(`Buscando Artesao por ID: ${id}`);
		const artesao = await this.artesaoRepo.buscarPorId(id);
		if (!artesao) {
			logger.warn(`Artesao não encontrado para ID: ${id}`);
		}
		return artesao;
	}

	async buscarPorEmail(email: string): Promise<Omit<Artesao, "id" | "updated_at" | "created_at"> | null> {
		return this.artesaoRepo.buscarPorEmail(email);
	}

	async atualizar(id: string, dados: Partial<Artesao>): Promise<void> {
		logger.info(`Atualizando Artesao ID: ${id} com dados: ${JSON.stringify(dados)}`);
		try {
			await this.artesaoRepo.atualizar(id, dados);
			logger.info(`Artesao ID: ${id} atualizado com sucesso.`);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(`Erro ao atualizar Artesao ID: ${id}: ${error.message}`, { stack: error.stack });
			} else {
				logger.error(`Erro ao atualizar Artesao ID: ${id}: ${JSON.stringify(error)}`);
			}
			throw error;
		}
	}

	async deletar(id: string): Promise<void> {
		logger.info(`Deletando Artesao ID: ${id}`);
		try {
			await this.artesaoRepo.deletar(id);
			logger.info(`Artesao ID: ${id} deletado com sucesso.`);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(`Erro ao deletar Artesao ID: ${id}: ${error.message}`, { stack: error.stack });
			} else {
				logger.error(`Erro ao deletar Artesao ID: ${id}: ${JSON.stringify(error)}`);
			}
			throw error;
		}
	}
}


