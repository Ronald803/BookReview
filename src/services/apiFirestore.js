import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { getBookById } from "./api";

export async function getLibrosFavoritos(userEmail) {
  const librosFavoritosCol = query(
    collection(db, "libros_favoritos"),
    where("usuario", "==", userEmail)
  ); // nombre de la colección
  const librosSnapshot = await getDocs(librosFavoritosCol);
  const librosFavoritosList = librosSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const librosFavoritosData = await Promise.all(
    librosFavoritosList.map(async (book) => {
      return await getBookById(book.id_libro);
    })
  );
  return librosFavoritosData;
}

export async function addFavoritos(idLibro, userEmail) {
  try {
    const docRef = await addDoc(collection(db, "libros_favoritos"), {
      id_libro: idLibro,
      usuario: userEmail,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error al agregar documento: ", e);
  }
}

export async function getReseñas(idLibro) {
  try {
    const reseñasLibroCol = query(
      collection(db, "reseña"),
      where("id_libro", "==", idLibro)
    );
    const reseñasSnapshot = await getDocs(reseñasLibroCol);
    const reseñasList = reseñasSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return reseñasList;
  } catch (e) {
    console.error("Error al obtener reseñas: ", e);
  }
}

export async function addReseña(autor, calificación, id_libro, reseña) {
  try {
    const docRef = await addDoc(collection(db, "reseña"), {
      autor,
      calificación,
      id_libro,
      reseña,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar documento: ", e);
  }
}
