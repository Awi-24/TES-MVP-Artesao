import { collection, doc, getDoc, getDocs, query, where, addDoc, deleteDoc } 
from "firebase/firestore";
import { ProdutoImagem } from "../../core/entities/ProdutoImagem";
import { ProdutoImagemPort } from "../../core/ports/ProdutoImagem.Port";
import db from "../../db/db";

export class ProdutoImagemRepository implements ProdutoImagemPort {
	async criar(imagem: Omit<ProdutoImagem, "id">): Promise<void> {
		await addDoc(collection(db, "ProdutoImagem"), {
			...imagem,
		});
	}

	async listarPorProduto(produtoId: string): Promise<ProdutoImagem[]> {
		const q = query(collection(db, "ProdutoImagem"), where("produto_id", "==", produtoId));
		const dataSnapshot = await getDocs(q);

		return dataSnapshot.docs.map((d) => {
			const data = d.data();
			return {
				id: d.id,
				produto_id: data.produto_id,
				url: data.url,
				descricao: data.descricao,
				created_at: data.created_at,
			};
		});
	}

	async deletar(id: string): Promise<void> {
		await deleteDoc(doc(db, "ProdutoImagem", id));
	}
}
