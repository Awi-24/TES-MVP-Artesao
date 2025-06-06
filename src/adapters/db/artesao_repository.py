from src.core.ports.artesao_repository_port import ArtesaoRepositoryPort
from src.core.entities.artesao import Artesao
from src.adapters.db.database import DatabaseConnection
from typing import Optional

class ArtesaoRepository(ArtesaoRepositoryPort):
    def __init__(self, db_connection: DatabaseConnection):
        self.db_connection = db_connection

    def save(self, artesao: Artesao) -> Artesao:
        conn = self.db_connection.get_connection()
        cursor = conn.cursor()
        if artesao.id:
            # Update existing artesao
            cursor.execute(
                """UPDATE artesao SET nome = %s, email = %s, telefone = %s, logradouro = %s, cidade = %s, estado = %s, cep = %s, senha_hash = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING id, created_at, updated_at""",
                (artesao.nome, artesao.email, artesao.telefone, artesao.logradouro, artesao.cidade, artesao.estado, artesao.cep, artesao.senha_hash, artesao.id)
            )
        else:
            # Insert new artesao
            cursor.execute(
                """INSERT INTO artesao (nome, email, telefone, logradouro, cidade, estado, cep, senha_hash) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id, created_at, updated_at""",
                (artesao.nome, artesao.email, artesao.telefone, artesao.logradouro, artesao.cidade, artesao.estado, artesao.cep, artesao.senha_hash)
            )
        row = cursor.fetchone()
        conn.commit()
        artesao.id = row[0]
        artesao.created_at = row[1]
        artesao.updated_at = row[2]
        return artesao

    def find_by_email(self, email: str) -> Optional[Artesao]:
        conn = self.db_connection.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, nome, email, telefone, logradouro, cidade, estado, cep, senha_hash, created_at, updated_at FROM artesao WHERE email = %s", (email,))
        row = cursor.fetchone()
        if row:
            return Artesao(*row)
        return None

    def find_by_id(self, artesao_id: int) -> Optional[Artesao]:
        conn = self.db_connection.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, nome, email, telefone, logradouro, cidade, estado, cep, senha_hash, created_at, updated_at FROM artesao WHERE id = %s", (artesao_id,))
        row = cursor.fetchone()
        if row:
            return Artesao(*row)
        return None


