import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { addReseña, getReseñas } from "../../services/apiFirestore";
import { getBookById } from "../../services/api";

const StarRating = ({ rating }) => {
  const filledStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(5 - rating);
  return (
    <Text style={styles.stars}>
      {filledStars}
      {emptyStars}
    </Text>
  );
};

export default function BookScreen() {
  const { bookSelected: bookId, setBookSelected, userEmail } = useAuth();
  const [book, setBook] = useState(null);
  const [reseñasList, setReseñasList] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  const fetchBook = async () => {
    try {
      const data = await getBookById(bookId);
      setBook(data);
    } catch (error) {
      console.error("Error al obtener libro:", error);
    }
  };

  const fetchReseñas = async () => {
    try {
      const data = await getReseñas(bookId);
      setReseñasList(data);
    } catch (error) {
      console.error("Error al obtener reseñas:", error);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchReseñas();
  }, []);

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Cargando libro...</Text>
      </View>
    );
  }
  const handleSubmitReview = async () => {
    await addReseña(userEmail, rating, bookId, newReview);
    fetchReseñas();
    setNewReview("");
    setRating(0);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity
        onPress={() => setBookSelected(null)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Image
          source={{ uri: book.imageLinks?.thumbnail }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
        <Text style={styles.title}>{book.title}</Text>

        {book.authors && (
          <Text style={styles.authors}>{book.authors.join(", ")}</Text>
        )}

        {book.publishedDate && (
          <Text style={styles.publishedDate}>
            Publicado: {book.publishedDate}
          </Text>
        )}

        {book.pageCount && (
          <Text style={styles.pageCount}>Páginas: {book.pageCount}</Text>
        )}

        <Text style={styles.description}>{book.description}</Text>
      </View>

      {reseñasList.length > 0 && (
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Reseñas</Text>
          {reseñasList.map((reseña) => (
            <View key={reseña.id} style={styles.reviewCard}>
              <Text style={styles.reviewer}>{reseña.autor}</Text>
              <StarRating rating={reseña.calificación} />
              <Text style={styles.reviewText}>{reseña.reseña}</Text>
            </View>
          ))}
        </View>
      )}
      <View style={styles.reviewForm}>
        <Text style={styles.formTitle}>Agregar una reseña</Text>
        <Text style={styles.label}>Calificación:</Text>
        <View style={styles.starsSelector}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity key={num} onPress={() => setRating(num)}>
              <Text style={styles.selectableStar}>
                {num <= rating ? "★" : "☆"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Reseña:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe tu reseña aquí"
          multiline
          value={newReview}
          onChangeText={setNewReview}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitReview}
        >
          <Text style={styles.submitButtonText}>Enviar reseña</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  scrollContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  thumbnail: {
    width: 150,
    height: 220,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  authors: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    color: "#555",
    marginBottom: 6,
  },
  publishedDate: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  pageCount: {
    fontSize: 12,
    color: "#888",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#333",
    textAlign: "justify",
  },
  // Reseñas
  reviewsContainer: {
    marginTop: 24,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  reviewCard: {
    backgroundColor: "#eaeaea",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewer: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  stars: {
    fontSize: 16,
    color: "#FFD700",
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
  },
  reviewForm: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  textInput: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    textAlignVertical: "top",
    minHeight: 60,
  },
  starsSelector: {
    flexDirection: "row",
    marginBottom: 12,
  },
  selectableStar: {
    fontSize: 24,
    color: "#FFD700",
    marginHorizontal: 4,
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
