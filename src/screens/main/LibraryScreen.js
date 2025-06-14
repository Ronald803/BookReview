import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { getBooks } from "../../services/api";
import { addFavoritos } from "../../services/apiFirestore";
import { useAuth } from "../../context/AuthContext";
import BookScreen from "./BookScreen";
import { useFocusEffect } from "@react-navigation/native";

export default function LibraryScreen() {
  const [books, setBooks] = useState([]);
  const { userEmail, bookSelected, setBookSelected } = useAuth();
  useFocusEffect(
    useCallback(() => {
      setBookSelected(null);
    }, [])
  );
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error al obtener libros:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleOnSelect = async (idLibro) => {
    try {
      await addFavoritos(idLibro, userEmail);
      console.log(`Libro ${idLibro} añadido a favoritos`);
    } catch (error) {
      console.error("Error al añadir a favoritos:", error);
    }
  };

  const renderBookItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageLinks?.thumbnail }}
        style={styles.thumbnail}
        resizeMode="contain"
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      {item.subtitle && (
        <Text style={styles.subtitle} numberOfLines={2}>
          {item.subtitle}
        </Text>
      )}
      <Text style={styles.author} numberOfLines={2}>
        {item.authors?.join(", ")}
      </Text>

      <TouchableOpacity
        onPress={() => handleOnSelect(item.id)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Añadir a Favoritos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setBookSelected(item.id)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {bookSelected ? (
        <BookScreen a={"123"} />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={renderBookItem}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  list: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    width: "48%",
    alignItems: "center",
  },
  thumbnail: {
    width: 100,
    height: 150,
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
    marginTop: 2,
  },
  author: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    marginTop: 4,
  },
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
});
