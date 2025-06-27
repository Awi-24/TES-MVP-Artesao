import { Produto } from "../../core/entities/Produto";
import { ProdutoPort } from "../../core/ports/Produto.Port";
import logger from "../../logger";

export class ProdutoRepository implements ProdutoPort {
	private produtos: Produto[] = [];

	async criar(produto: Produto): Promise<void> {
		logger.debug(`DB: Iniciando criação de Produto para nome: ${produto.nome}`);
		const startTime = process.hrtime.bigint();
		try {
			this.produtos.push(produto);
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			logger.info(`DB: Produto criado com sucesso. ID: ${produto.id}, Duração: ${duration.toFixed(2)}ms`);
		} catch (error) {
			logger.error(`DB: Erro ao criar Produto para nome ${produto.nome}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async buscarPorId(id: string): Promise<Produto | null> {
		logger.debug(`DB: Buscando Produto por ID: ${id}`);
		const startTime = process.hrtime.bigint();
		try {
			const result = this.produtos.find(p => p.id === id) ?? null;
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			if (result) {
				logger.info(`DB: Produto encontrado por ID: ${id}. Duração: ${duration.toFixed(2)}ms`);
			} else {
				logger.warn(`DB: Produto não encontrado por ID: ${id}. Duração: ${duration.toFixed(2)}ms`);
			}
			return result;
		} catch (error) {
			logger.error(`DB: Erro ao buscar Produto por ID ${id}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async listarPorArtesao(artesaoId: string): Promise<Produto[]> {
		logger.debug(`DB: Listando Produtos para Artesao ID: ${artesaoId}`);
		const startTime = process.hrtime.bigint();
		try {
			const result = this.produtos.filter(p => p.artesao_id === artesaoId);
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			logger.info(`DB: Listagem de Produtos para Artesao ID: ${artesaoId} concluída. Encontrados ${result.length} produtos. Duração: ${duration.toFixed(2)}ms`);
			return result;
		} catch (error) {
			logger.error(`DB: Erro ao listar Produtos para Artesao ID: ${artesaoId}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async atualizar(id: string, dados: Partial<Produto>): Promise<void> {
		logger.debug(`DB: Iniciando atualização de Produto ID: ${id}`);
		const startTime = process.hrtime.bigint();
		try {
			const index = this.produtos.findIndex(p => p.id === id);
			if (index === -1) {
				logger.warn(`DB: Produto ID: ${id} não encontrado para atualização.`);
				return;
			}
			this.produtos[index] = { ...this.produtos[index], ...dados };
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			logger.info(`DB: Produto ID: ${id} atualizado com sucesso. Duração: ${duration.toFixed(2)}ms`);
		} catch (error) {
			logger.error(`DB: Erro ao atualizar Produto ID: ${id}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async deletar(id: string): Promise<void> {
		logger.debug(`DB: Iniciando exclusão de Produto ID: ${id}`);
		const startTime = process.hrtime.bigint();
		try {
			const initialLength = this.produtos.length;
			this.produtos = this.produtos.filter(p => p.id !== id);
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			if (this.produtos.length < initialLength) {
				logger.info(`DB: Produto ID: ${id} deletado com sucesso. Duração: ${duration.toFixed(2)}ms`);
			} else {
				logger.warn(`DB: Produto ID: ${id} não encontrado para exclusão.`);
			}
		} catch (error) {
			logger.error(`DB: Erro ao deletar Produto ID: ${id}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}
}


