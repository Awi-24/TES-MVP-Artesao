import logger from "../../logger";
export class ProdutoImagem {
  constructor(
    public id: string,
    public produto_id: string,
    public url: string,
    public descricao: string,
    public created_at: Date
  ) { logger.debug(`Entidade ProdutoImagem criada: { id: ${id}, produto_id: ${produto_id} }`); }
}
