import { Produto } from "../entities/Produto";
import { ProdutoPort } from "../ports/Produto.Port";
import logger from "../../logger";

export class ProdutoUseCase {
	constructor(private readonly produtoRepo: ProdutoPort) {}

	async criar(input: Omit<Produto, "id" | "created_at" | "updated_at">): Promise<void> {
		logger.info(`Iniciando caso de uso ProdutoUseCase.criar para produto: ${input.nome}`);
		try {
			const produto = new Produto(
			"",
			input.artesao_id,
			input.nome,
			input.descricao,
			input.preco,
			input.quantidade,
			input.categoria,
			new Date(),
			new Date()
			);

			await this.produtoRepo.criar(produto);
			logger.info(`Produto criado com sucesso. ID: ${produto.id}, Nome: ${produto.nome}`);
		} catch (error) {
			logger.error(`Erro no caso de uso ProdutoUseCase.criar para produto ${input.nome}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async buscarPorId(id: string): Promise<Produto | null> {
		logger.debug(`Buscando Produto por ID: ${id}`);
		const produto = await this.produtoRepo.buscarPorId(id);
		if (!produto) {
			logger.warn(`Produto não encontrado para ID: ${id}`);
		}
		return produto;
	}

	async listarPorArtesao(artesaoId: string): Promise<Produto[]> {
		logger.debug(`Listando Produtos para Artesao ID: ${artesaoId}`);
		try {
			const produtos = await this.produtoRepo.listarPorArtesao(artesaoId);
			logger.info(`Listagem de Produtos para Artesao ID: ${artesaoId} concluída. Encontrados ${produtos.length} produtos.`);
			return produtos;
		} catch (error) {
			logger.error(`Erro ao listar Produtos para Artesao ID: ${artesaoId}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async atualizar(id: string, dados: Partial<Produto>): Promise<void> {
		logger.info(`Atualizando Produto ID: ${id} com dados: ${JSON.stringify(dados)}`);
		try {
			await this.produtoRepo.atualizar(id, dados);
			logger.info(`Produto ID: ${id} atualizado com sucesso.`);
		} catch (error) {
			logger.error(`Erro ao atualizar Produto ID: ${id}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}

	async deletar(id: string): Promise<void> {
		logger.info(`Deletando Produto ID: ${id}`);
		try {
			await this.produtoRepo.deletar(id);
			logger.info(`Produto ID: ${id} deletado com sucesso.`);
		} catch (error) {
			logger.error(`Erro ao deletar Produto ID: ${id}: ${error.message}`, { stack: error.stack });
			throw error;
		}
	}
}


