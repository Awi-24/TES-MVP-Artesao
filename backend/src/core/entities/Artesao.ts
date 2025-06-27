import logger from "../../logger";
export class Artesao {
  constructor(
    public id: string,
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
  ) {logger.debug(`Entidade Artesao criada: { id: ${id}, email: ${email} }`);
    if (!email.includes("@")) {
      logger.warn(`Tentativa de criar Artesao com email inválido: ${email}`);
    }}
}