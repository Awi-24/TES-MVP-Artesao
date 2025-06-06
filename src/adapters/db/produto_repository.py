from src.core.ports.produto_repository_port import ProdutoRepositoryPort
from src.core.entities.produto import Produto
from src.adapters.db.database import DatabaseConnection
from typing import List, Optional

class ProdutoRepository(ProdutoRepositoryPort):
    def __init__(self, db_connection: DatabaseConnection):
        self.db_connection = db_connection

    def save(self, produto: Produto) -> Produto:
        conn = self.db_connection.get_connection()
        cursor = conn.cursor()
        if produto.id:
            cursor.execute(
                """UPDATE produto SET artesao_id = %s, nome = %s, descricao = %s, preco = %s, quantidade = %s, categoria = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING id, created_at, updated_at""",
                (produto.artesao_id, produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria, produto.id)
            )
        else:
            cursor.execute(
                """INSERT INTO produto (artesao_id, nome, descricao, preco, quantidade, categoria) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id, created_at, updated_at""",
                (produto.artesao_id, produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria)
            )
        row = cursor.fetchone()
        conn.commit()
        produto.id = row[0]
        produto.created_at = row[1]
        produto.updated_at = row[2]
        return produto

    def find_by_id(self, produto_id: int) -> Optional[Produto]:
        conn = self.db_connection.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, artesao_id, nome, descricao, preco, quantidade, categoria, created_at, updated_at FROM produto WHERE id = %s", (produto_id,))
        row = cursor.fetchone()
        if row:
            return Produto(*row)
        return None

    def find_by_artesao_id(self, artesao_id: int) -> List[Produto]:
        conn = self.db_connection.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, artesao_id, nome, descricao, preco, quantidade, categoria, created_at, updated_at FROM produto WHERE artesao_id = %s", (artesao_id,))
        rows = cursor.fetchall()
        return [Produto(*row) for row in rows]

    def delete(self, produto_id: int) -> None:
        conn = self.db_connection.get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM produto WHERE id = %s", (produto_id,))
        conn.commit()

    def find_all(self) -> List[Produto]:
        conn = self.db_connection.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, artesao_id, nome, descricao, preco, quantidade, categoria, created_at, updated_at FROM produto")
        rows = cursor.fetchall()
        return [Produto(*row) for row in rows]

    def find_by_categoria(self, categoria: str) -> List[Produto]:
        conn = self.db_connection.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, artesao_id, nome, descricao, preco, quantidade, categoria, created_at, updated_at FROM produto WHERE categoria = %s", (categoria,))
        rows = cursor.fetchall()
        return [Produto(*row) for row in rows]

    def search_by_keyword(self, keyword: str) -> List[Produto]:
        conn = self.db_connection.get_connection()
        cursor = conn.cursor()
        search_term = f"%{keyword}%"
        cursor.execute("SELECT id, artesao_id, nome, descricao, preco, quantidade, categoria, created_at, updated_at FROM produto WHERE nome ILIKE %s OR descricao ILIKE %s", (search_term, search_term))
        rows = cursor.fetchall()
        return [Produto(*row) for row in rows]


