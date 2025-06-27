export class Produto {
  constructor(
    public id: string,
    public artesao_id: string,
    public nome: string,
    public descricao: string,
    public preco: number,
    public quantidade: number,
    public categoria: string,
    public created_at: Date,
    public updated_at: Date
  ) {}
}
