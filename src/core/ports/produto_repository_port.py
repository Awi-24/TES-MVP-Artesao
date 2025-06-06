from abc import ABC, abstractmethod
from typing import List, Optional
from src.core.entities.produto import Produto

class ProdutoRepositoryPort(ABC):
    @abstractmethod
    def save(self, produto: Produto) -> Produto:
        pass

    @abstractmethod
    def find_by_id(self, produto_id: int) -> Optional[Produto]:
        pass

    @abstractmethod
    def find_by_artesao_id(self, artesao_id: int) -> List[Produto]:
        pass

    @abstractmethod
    def delete(self, produto_id: int) -> None:
        pass

    @abstractmethod
    def find_all(self) -> List[Produto]:
        pass

    @abstractmethod
    def find_by_categoria(self, categoria: str) -> List[Produto]:
        pass

    @abstractmethod
    def search_by_keyword(self, keyword: str) -> List[Produto]:
        pass


