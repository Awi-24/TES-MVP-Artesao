import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } 
from "firebase/firestore";
import { Produto } from "../../core/entities/Produto";
import { ProdutoPort } from "../../core/ports/Produto.Port";
import db from "../../db/db";

export class ProdutoRepository implements ProdutoPort {
	async criar(produto: Omit<Produto, "id" | "created_at" | "updated_at">): Promise<void> {
		await addDoc(collection(db, "Produto"), {
			...produto,
			created_at: new Date(),
			updated_at: new Date()
		});
	}

	async buscarPorId(id: string): Promise<Produto | null> {
		const dataSnapshot = await getDoc(doc(db, "Produto", id));
		if (!dataSnapshot.exists()) return null;

		const data = dataSnapshot.data();
		return {
			id: dataSnapshot.id,
			artesao_id: data.artesao_id,
			nome: data.nome,
			descricao: data.descricao,
			preco: data.preco,
			quantidade: data.quantidade,
			categoria: data.categoria,
			created_at: data.created_at,
			updated_at: data.updated_at
		};
	}

	async buscarTodos(): Promise<Produto[] | null> {
		const dataSnapshot = await getDocs(collection(db, "Produto"));
		if (dataSnapshot.empty) return null;

		const data = dataSnapshot.docs.map((d) => {
			const data = d.data()
			return {
				id: d.id,
				artesao_id: data.artesao_id,
				nome: data.nome,
				descricao: data.descricao,
				preco: data.preco,
				quantidade: data.quantidade,
				categoria: data.categoria,
				created_at: data.created_at,
				updated_at: data.updated_at
			};
		})

		return data || null
	}

	async listarPorArtesao(artesaoId: string): Promise<Produto[]> {
		const q = query(collection(db, "Produto"), where("artesao_id", "==", artesaoId));
		const dataSnapshot = await getDocs(q);

		return dataSnapshot.docs.map((d) => {
			const data = d.data();
			return {
				id: d.id,
				artesao_id: data.artesao_id,
				nome: data.nome,
				descricao: data.descricao,
				preco: data.preco,
				quantidade: data.quantidade,
				categoria: data.categoria,
				created_at: data.created_at,
				updated_at: data.updated_at,
			};
		});
	}

	async atualizar(id: string, dados: Partial<Produto>): Promise<void> {
		await updateDoc(doc(db, "Produto", id), {
		...dados,
		});
	}

	async deletar(id: string): Promise<void> {
		await deleteDoc(doc(db, "Produto", id));
	}
}
