// Importe a porta para que possamos tipar nosso mock corretamente
import { ArtesaoPort } from "../../ports/Artesao.Port";
import { ArtesaoUseCase } from "../Artesao.UseCase";
import { Artesao } from "../../entities/Artesao";

describe("ArtesaoUseCase", () => {
  let artesaoUseCase: ArtesaoUseCase;
  // Agora nosso mock simula a implementação da porta
  let mockArtesaoPort: ArtesaoPort;

  beforeEach(() => {
    // Adicionamos todos os métodos que a porta espera
    mockArtesaoPort = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorEmail: jest.fn(), // Novo método mockado
      atualizar: jest.fn(),
      deletar: jest.fn(),
    };
    artesaoUseCase = new ArtesaoUseCase(mockArtesaoPort);
  });

  // Teste de criação de artesão (Caminho Feliz)
  describe("criar", () => {
    it("should create a new artesao when email does not exist", async () => {
      const artesaoData = {
        nome: "Novo Artesao",
        email: "novo@example.com",
        telefone: "11999999999",
        logradouro: "Rua Nova, 123",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01000-000",
        senha_hash: "hashed_password",
      };

      // Cenário: O email ainda NÃO existe no banco
      (mockArtesaoPort.buscarPorEmail as jest.Mock).mockResolvedValue(null);

      await artesaoUseCase.criar(artesaoData);

      // Verifica se a busca por email foi chamada
      expect(mockArtesaoPort.buscarPorEmail).toHaveBeenCalledWith(artesaoData.email);
      // Verifica se o método 'criar' foi chamado com um objeto da classe Artesao
      expect(mockArtesaoPort.criar).toHaveBeenCalledWith(expect.any(Artesao));
    });

    // Novo teste para o cenário de erro (email duplicado)
    it("should throw an error if the email already exists", async () => {
        const artesaoData = {
            nome: "Artesao Repetido",
            email: "repetido@example.com",
            telefone: "11888888888",
            logradouro: "Rua Velha, 456",
            cidade: "Rio de Janeiro",
            estado: "RJ",
            cep: "20000-000",
            senha_hash: "outra_senha",
        };
        const now = new Date();
        const existingArtesao = new Artesao(
            1, "Nome Antigo", "repetido@example.com", "11111111111", "", "", "", "", "", now, now
        );

        // Cenário: O email JÁ existe no banco
        (mockArtesaoPort.buscarPorEmail as jest.Mock).mockResolvedValue(existingArtesao);

        // Esperamos que a operação seja rejeitada com a mensagem de erro correta
        await expect(artesaoUseCase.criar(artesaoData)).rejects.toThrow("Email já cadastrado");

        // Garante que, se o email já existe, o método 'criar' NUNCA é chamado
        expect(mockArtesaoPort.criar).not.toHaveBeenCalled();
    });
  });

  describe("buscarPorId", () => {
    it("should return an artesao when found by id", async () => {
      const now = new Date();
      const existingArtesao = new Artesao(
        1, "Artesao Existente", "existente@example.com", "11987654321", "Rua Existente, 456", "Rio de Janeiro", "RJ", "20000-000", "hashed_password", now, now
      );

      (mockArtesaoPort.buscarPorId as jest.Mock).mockResolvedValue(existingArtesao);

      const result = await artesaoUseCase.buscarPorId(1);

      expect(mockArtesaoPort.buscarPorId).toHaveBeenCalledWith(1);
      expect(result).toEqual(existingArtesao);
    });

    it("should return null if artesao is not found", async () => {
        (mockArtesaoPort.buscarPorId as jest.Mock).mockResolvedValue(null);

        const result = await artesaoUseCase.buscarPorId(999);

        expect(mockArtesaoPort.buscarPorId).toHaveBeenCalledWith(999);
        expect(result).toBeNull();
    });
  });
  
  // Testes para 'atualizar' e 'deletar' continuam simples, pois a lógica é direta
  describe("atualizar", () => {
      it("should call the repository to update an artesao", async () => {
          const updatedData = { nome: "Nome Atualizado" };
          await artesaoUseCase.atualizar(1, updatedData);
          expect(mockArtesaoPort.atualizar).toHaveBeenCalledWith(1, updatedData);
      });
  });

  describe("deletar", () => {
      it("should call the repository to delete an artesao", async () => {
          await artesaoUseCase.deletar(1);
          expect(mockArtesaoPort.deletar).toHaveBeenCalledWith(1);
      });
  });
});