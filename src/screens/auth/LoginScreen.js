import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { validateEmail } from "../../utils/validations";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [isErrorEmail, setIsErrorEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log({ userCredential });
      login(email);
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsErrorEmail(email !== "" && !validateEmail(email));
  }, [email]);
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Book Review
      </Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      {isErrorEmail ? <Text style={styles.error}>Email inválido</Text> : null}
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {password == "" ? (
        <Text style={styles.error}>La contraseña es necesaria</Text>
      ) : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Iniciar Sesión"
          onPress={handleLogin}
          containerStyle={styles.button}
          disabled={isErrorEmail || password === "" || isLoading}
        />
      )}
      <Button
        title="Registrarse"
        type="outline"
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        disabled={isLoading}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
