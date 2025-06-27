import { Artesao } from "../../core/entities/Artesao";
import { ArtesaoPort } from "../../core/ports/Artesao.Port";
import logger from "../../logger";

export class ArtesaoRepository implements ArtesaoPort {
	private artesoes: Artesao[] = [];

	async criar(artesao: Artesao): Promise<void> {
		logger.debug(`DB: Iniciando criação de Artesao para email: ${artesao.email}`);
		const startTime = process.hrtime.bigint();
		try {
			this.artesoes.push(artesao);
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			logger.info(`DB: Artesao criado com sucesso. ID: ${artesao.id}, Duração: ${duration.toFixed(2)}ms`);
		} catch (error) {
			logger.error(`DB: Erro ao criar Artesao para email ${artesao.email}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async buscarPorId(id: string): Promise<Artesao | null> {
		logger.debug(`DB: Buscando Artesao por ID: ${id}`);
		const startTime = process.hrtime.bigint();
		try {
			const result = this.artesoes.find(a => a.id === id) ?? null;
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			if (result) {
				logger.info(`DB: Artesao encontrado por ID: ${id}. Duração: ${duration.toFixed(2)}ms`);
			} else {
				logger.warn(`DB: Artesao não encontrado por ID: ${id}. Duração: ${duration.toFixed(2)}ms`);
			}
			return result;
		} catch (error) {
			logger.error(`DB: Erro ao buscar Artesao por ID ${id}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async buscarPorEmail(email: string): Promise<Artesao | null> {
		logger.debug(`DB: Buscando Artesao por email: ${email}`);
		const startTime = process.hrtime.bigint();
		try {
			const result = this.artesoes.find(a => a.email === email) ?? null;
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			if (result) {
				logger.info(`DB: Artesao encontrado por email: ${email}. Duração: ${duration.toFixed(2)}ms`);
			} else {
				logger.warn(`DB: Artesao não encontrado por email: ${email}. Duração: ${duration.toFixed(2)}ms`);
			}
			return result;
		} catch (error) {
			logger.error(`DB: Erro ao buscar Artesao por email ${email}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async atualizar(id: string, dados: Partial<Artesao>): Promise<void> {
		logger.debug(`DB: Iniciando atualização de Artesao ID: ${id}`);
		const startTime = process.hrtime.bigint();
		try {
			const index = this.artesoes.findIndex(a => a.id === id);
			if (index === -1) {
				logger.warn(`DB: Artesao ID: ${id} não encontrado para atualização.`);
				return;
			}
			this.artesoes[index] = { ...this.artesoes[index], ...dados };
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			logger.info(`DB: Artesao ID: ${id} atualizado com sucesso. Duração: ${duration.toFixed(2)}ms`);
		} catch (error) {
			logger.error(`DB: Erro ao atualizar Artesao ID: ${id}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async deletar(id: string): Promise<void> {
		logger.debug(`DB: Iniciando exclusão de Artesao ID: ${id}`);
		const startTime = process.hrtime.bigint();
		try {
			const initialLength = this.artesoes.length;
			this.artesoes = this.artesoes.filter(a => a.id !== id);
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			if (this.artesoes.length < initialLength) {
				logger.info(`DB: Artesao ID: ${id} deletado com sucesso. Duração: ${duration.toFixed(2)}ms`);
			} else {
				logger.warn(`DB: Artesao ID: ${id} não encontrado para exclusão.`);
			}
		} catch (error) {
			logger.error(`DB: Erro ao deletar Artesao ID: ${id}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}
}


