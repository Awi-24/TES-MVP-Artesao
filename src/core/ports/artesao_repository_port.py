from abc import ABC, abstractmethod
from typing import List, Optional
from src.core.entities.artesao import Artesao

class ArtesaoRepositoryPort(ABC):
    @abstractmethod
    def save(self, artesao: Artesao) -> Artesao:
        pass

    @abstractmethod
    def find_by_email(self, email: str) -> Optional[Artesao]:
        pass

    @abstractmethod
    def find_by_id(self, artesao_id: int) -> Optional[Artesao]:
        pass


