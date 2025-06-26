import { ProdutoImagem } from "../../core/entities/ProdutoImagem";
import { ProdutoImagemPort } from "../../core/ports/ProdutoImagem.Port";
import logger from "../../logger";

export class ProdutoImagemRepository implements ProdutoImagemPort {
	private imagens: ProdutoImagem[] = [];

	async criar(imagem: ProdutoImagem): Promise<void> {
		logger.debug(`DB: Iniciando criação de ProdutoImagem para produto_id: ${imagem.produto_id}`);
		const startTime = process.hrtime.bigint();
		try {
			this.imagens.push(imagem);
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			logger.info(`DB: ProdutoImagem criada com sucesso. ID: ${imagem.id}, Duração: ${duration.toFixed(2)}ms`);
		} catch (error) {
			logger.error(`DB: Erro ao criar ProdutoImagem para produto_id ${imagem.produto_id}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async listarPorProduto(produtoId: string): Promise<ProdutoImagem[]> {
		logger.debug(`DB: Listando ProdutoImagens para Produto ID: ${produtoId}`);
		const startTime = process.hrtime.bigint();
		try {
			const result = this.imagens.filter(i => i.produto_id === produtoId);
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			logger.info(`DB: Listagem de ProdutoImagens para Produto ID: ${produtoId} concluída. Encontradas ${result.length} imagens. Duração: ${duration.toFixed(2)}ms`);
			return result;
		} catch (error) {
			logger.error(`DB: Erro ao listar ProdutoImagens para Produto ID: ${produtoId}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async deletar(id: string): Promise<void> {
		logger.debug(`DB: Iniciando exclusão de ProdutoImagem ID: ${id}`);
		const startTime = process.hrtime.bigint();
		try {
			const initialLength = this.imagens.length;
			this.imagens = this.imagens.filter(i => i.id !== id);
			const endTime = process.hrtime.bigint();
			const duration = Number(endTime - startTime) / 1_000_000; // ms
			if (this.imagens.length < initialLength) {
				logger.info(`DB: ProdutoImagem ID: ${id} deletada com sucesso. Duração: ${duration.toFixed(2)}ms`);
			} else {
				logger.warn(`DB: ProdutoImagem ID: ${id} não encontrada para exclusão.`);
			}
		} catch (error) {
			logger.error(`DB: Erro ao deletar ProdutoImagem ID: ${id}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}
}


