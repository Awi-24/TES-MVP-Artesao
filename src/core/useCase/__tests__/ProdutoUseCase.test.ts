import { ProdutoPort } from "../../ports/Produto.Port";
import { ProdutoUseCase } from "../Produto.UseCase";
import { Produto } from "../../entities/Produto";

describe("ProdutoUseCase", () => {
  let produtoUseCase: ProdutoUseCase;
  let mockProdutoPort: ProdutoPort;

  beforeEach(() => {
    mockProdutoPort = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      listarPorArtesao: jest.fn(),
      atualizar: jest.fn(),
      deletar: jest.fn(),
    };
    produtoUseCase = new ProdutoUseCase(mockProdutoPort);
  });

  describe("criar", () => {
    it("should create a new product", async () => {
      const produtoData = {
        artesao_id: 1,
        nome: "Vaso de Cerâmica",
        descricao: "Vaso artesanal de cerâmica com pintura à mão.",
        preco: 50.00,
        quantidade: 10,
        categoria: "Decoração",
      };

      await produtoUseCase.criar(produtoData);

      // Verifica se o método 'criar' foi chamado com um objeto da classe Produto
      expect(mockProdutoPort.criar).toHaveBeenCalledWith(expect.any(Produto));
      // Você pode fazer verificações mais específicas se desejar
      expect(mockProdutoPort.criar).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: "Vaso de Cerâmica",
          preco: 50.00,
        })
      );
    });
  });

  describe("buscarPorId", () => {
    it("should return a product when found by id", async () => {
      const now = new Date();
      const existingProduto = new Produto(
        1, 101, "Vaso", "Descrição", 50, 10, "Decoração", now, now
      );

      (mockProdutoPort.buscarPorId as jest.Mock).mockResolvedValue(existingProduto);

      const result = await produtoUseCase.buscarPorId(1);

      expect(mockProdutoPort.buscarPorId).toHaveBeenCalledWith(1);
      expect(result).toEqual(existingProduto);
    });

    it("should return null if product is not found", async () => {
      (mockProdutoPort.buscarPorId as jest.Mock).mockResolvedValue(null);

      const result = await produtoUseCase.buscarPorId(999);

      expect(mockProdutoPort.buscarPorId).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });

  describe("listarPorArtesao", () => {
    it("should return a list of products for a given artesao", async () => {
      const now = new Date();
      const produtos = [
        new Produto(1, 101, "Vaso", "", 10, 1, "", now, now),
        new Produto(2, 101, "Prato", "", 20, 2, "", now, now),
      ];

      (mockProdutoPort.listarPorArtesao as jest.Mock).mockResolvedValue(produtos);

      const result = await produtoUseCase.listarPorArtesao(101);

      expect(mockProdutoPort.listarPorArtesao).toHaveBeenCalledWith(101);
      expect(result).toEqual(produtos);
    });

    it("should return an empty array if an artesao has no products", async () => {
        (mockProdutoPort.listarPorArtesao as jest.Mock).mockResolvedValue([]);

        const result = await produtoUseCase.listarPorArtesao(102);

        expect(mockProdutoPort.listarPorArtesao).toHaveBeenCalledWith(102);
        expect(result).toEqual([]);
      });
  });

  describe("atualizar", () => {
    it("should call the repository to update a product", async () => {
      const updatedData = { preco: 65.50 };
      await produtoUseCase.atualizar(1, updatedData);
      expect(mockProdutoPort.atualizar).toHaveBeenCalledWith(1, updatedData);
    });
  });

  describe("deletar", () => {
    it("should call the repository to delete a product", async () => {
      await produtoUseCase.deletar(1);
      expect(mockProdutoPort.deletar).toHaveBeenCalledWith(1);
    });
  });
});