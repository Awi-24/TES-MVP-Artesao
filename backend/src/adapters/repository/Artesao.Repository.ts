import { collection, doc, getDoc, where, query, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Artesao } from "../../core/entities/Artesao";
import { ArtesaoPort } from "../../core/ports/Artesao.Port";
import db from '../../db/db';

export class ArtesaoRepository implements ArtesaoPort {

	async criar(artesao: Omit<Artesao, "id" | "updated_at" | "created_at">): Promise<string> {
		console.log("artesao: ", artesao)
		const dataSnapshot = await addDoc(collection(db, "Artesao"), {
			...artesao
		})

		return dataSnapshot.id
	}

	async buscarPorId(id: string): Promise<Artesao | null> {
		const dataSnapshot = await getDoc(doc(db, "Artesao", id))
		if(!dataSnapshot.exists()) return null

		const data = dataSnapshot.data()
		return {
			id: dataSnapshot.id,
			nome: data.nome,
			email: data.email,
			telefone: data.telefone,
			logradouro: data.logradouro,
			cidade: data.cidade,
			estado: data.estado,
			cep: data.cep,
			senha_hash: data.senha_hash,
			created_at: data.created_at,
			updated_at: data.updated_at
		}

	}

	async buscarPorEmail(body: {email: string, password: string}): Promise<Artesao | null> {
		// console.log("body: ", body)
		const q = query(collection(db, "Artesao"), where("email", "==", `${body.email}`))
		const dataSnapshot = await getDocs(q)
		if(body.password == "" && !dataSnapshot.empty) return null

		// console.log("Aqui")
		const result = dataSnapshot.docs.map((d) => {
			const data = d.data()
			const pass = data.senha_hash
			if(pass == body.password){
				return {
					id: d.id,
					nome: data.nome,
					email: data.email,
					telefone: data.telefone,
					logradouro: data.logradouro,
					cidade: data.cidade,
					estado: data.estado,
					cep: data.cep,
					senha_hash: "senha não retornada",
					created_at: data.created_at,
					updated_at: data.updated_at
				}
			}
		})
		// console.log("result[0]: ",result[0])
		return result[0] || null
	}

	async atualizar(id: string, dados: Partial<Artesao>): Promise<void> {
		await updateDoc(doc(db, "Artesao", id), {
			...dados
		})
	}

	async deletar(id: string): Promise<void> {
		await deleteDoc(doc(db, "Artesao", id))
	}
}
