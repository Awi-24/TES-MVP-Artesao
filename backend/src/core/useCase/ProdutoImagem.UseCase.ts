import { ProdutoImagem } from "../entities/ProdutoImagem";
import { ProdutoImagemPort } from "../ports/ProdutoImagem.Port";
import logger from "../../logger";
export class ProdutoImagemUseCase {
	constructor(private readonly imagemRepo: ProdutoImagemPort) {}

	async criar(input: Omit<ProdutoImagem, "id" | "created_at">): Promise<void> {
		logger.info(`Iniciando caso de uso ProdutoImagemUseCase.criar para produto_id: ${input.produto_id}`);
		try {
			const imagem = new ProdutoImagem(
			"",
			input.produto_id,
			input.url,
			input.descricao,
			new Date()
			);

			await this.imagemRepo.criar(imagem);
			logger.info(`Imagem de Produto criada com sucesso. ID: ${imagem.id}, Produto ID: ${imagem.produto_id}`);
		} catch (error) {
			if(error instanceof Error){
				logger.error(`Erro no caso de uso ProdutoImagemUseCase.criar para produto_id ${input.produto_id}: ${error.message}`, { stack: error.stack });
			}
			throw error;
		}
	}

	async listarPorProduto(produtoId: string): Promise<ProdutoImagem[]> {
		logger.debug(`Listando Imagens de Produto para Produto ID: ${produtoId}`);
		try {
			const imagens = await this.imagemRepo.listarPorProduto(produtoId);
			logger.info(`Listagem de Imagens de Produto para Produto ID: ${produtoId} concluída. Encontradas ${imagens.length} imagens.`);
			return imagens;
		} catch (error) {
			if(error instanceof Error){
				logger.error(`Erro ao listar Imagens de Produto para Produto ID: ${produtoId}: ${error.message}`, { stack: error.stack });
			}
			throw error;
		}
	}

	async deletar(id: string): Promise<void> {
		logger.info(`Deletando Imagem de Produto ID: ${id}`);
		try {
			await this.imagemRepo.deletar(id);
			logger.info(`Imagem de Produto ID: ${id} deletada com sucesso.`);
		} catch (error) {
			if(error instanceof Error){
				logger.error(`Erro ao deletar Imagem de Produto ID: ${id}: ${error.message}`, { stack: error.stack });
			}
			throw error;
		}
	}
}


