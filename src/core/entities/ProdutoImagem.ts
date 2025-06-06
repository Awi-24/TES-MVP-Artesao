export class ProdutoImagem {
  constructor(
    public id: number,
    public produto_id: number,
    public url: string,
    public descricao: string,
    public created_at: Date
  ) {}
}
