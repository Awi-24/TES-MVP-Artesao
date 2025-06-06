export class Produto {
  constructor(
    public id: number,
    public artesao_id: number,
    public nome: string,
    public descricao: string,
    public preco: number,
    public quantidade: number,
    public categoria: string,
    public created_at: Date,
    public updated_at: Date
  ) {}
}
