import { ProdutoImagemPort } from "../../ports/ProdutoImagem.Port";
import { ProdutoImagemUseCase } from "../ProdutoImagem.UseCase";
import { ProdutoImagem } from "../../entities/ProdutoImagem";

describe("ProdutoImagemUseCase", () => {
  let produtoImagemUseCase: ProdutoImagemUseCase;
  let mockProdutoImagemPort: ProdutoImagemPort;

  beforeEach(() => {
    mockProdutoImagemPort = {
      criar: jest.fn(),
      listarPorProduto: jest.fn(),
      deletar: jest.fn(),
    };
    produtoImagemUseCase = new ProdutoImagemUseCase(mockProdutoImagemPort);
  });

  describe("criar", () => {
    it("should create a new product image", async () => {
      const imagemData = {
        produto_id: 1,
        url: "http://example.com/imagem.jpg",
        descricao: "Vista frontal do vaso",
      };

      await produtoImagemUseCase.criar(imagemData);

      // Verifica se o método 'criar' foi chamado com um objeto da classe ProdutoImagem
      expect(mockProdutoImagemPort.criar).toHaveBeenCalledWith(expect.any(ProdutoImagem));
      expect(mockProdutoImagemPort.criar).toHaveBeenCalledWith(
        expect.objectContaining({
          produto_id: 1,
          url: "http://example.com/imagem.jpg",
        })
      );
    });
  });

  describe("listarPorProduto", () => {
    it("should return a list of images for a given product", async () => {
      const now = new Date();
      const imagens = [
        new ProdutoImagem(1, 101, "http://example.com/img1.jpg", "desc1", now),
        new ProdutoImagem(2, 101, "http://example.com/img2.jpg", "desc2", now),
      ];

      (mockProdutoImagemPort.listarPorProduto as jest.Mock).mockResolvedValue(imagens);

      const result = await produtoImagemUseCase.listarPorProduto(101);

      expect(mockProdutoImagemPort.listarPorProduto).toHaveBeenCalledWith(101);
      expect(result).toEqual(imagens);
    });

    it("should return an empty array if a product has no images", async () => {
      (mockProdutoImagemPort.listarPorProduto as jest.Mock).mockResolvedValue([]);

      const result = await produtoImagemUseCase.listarPorProduto(102);

      expect(mockProdutoImagemPort.listarPorProduto).toHaveBeenCalledWith(102);
      expect(result).toEqual([]);
    });
  });

  describe("deletar", () => {
    it("should call the repository to delete a product image", async () => {
      await produtoImagemUseCase.deletar(1);
      expect(mockProdutoImagemPort.deletar).toHaveBeenCalledWith(1);
    });
  });
});