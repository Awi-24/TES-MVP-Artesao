export class Artesao {
  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public telefone: string,
    public logradouro: string,
    public cidade: string,
    public estado: string,
    public cep: string,
    public senha_hash: string,
    public created_at: Date,
    public updated_at: Date
  ) {}
}