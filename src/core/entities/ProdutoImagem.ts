export class ProdutoImagem {
  constructor(
    public id: string,
    public produto_id: string,
    public url: string,
    public descricao: string,
    public created_at: Date
  ) {}
}
