import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../config/firebase";
import { validateEmail, validatePassword } from "../../utils/validations";
export default function RegisterScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [isErrorEmail, setIsErrorEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  useEffect(() => {
    setIsErrorEmail(email !== "" && !validateEmail(email));
  }, [email]);
  useEffect(() => {
    setIsErrorPassword(password !== "" && !validatePassword(password));
  }, [password]);
  useEffect(() => {
    setIsErrorConfirmPassword(
      confirmPassword !== "" && password !== confirmPassword
    );
  }, [confirmPassword]);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigation.replace("Home");
    } catch (error) {
      setError("Error al registrarse: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Registro
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
      {isErrorPassword ? (
        <Text style={styles.error}>
          Contraseña inválida, debe tener 8 caracteres, al menos una mayúscula,
          una minúscula, un caracter especial: !@#$%^&*
        </Text>
      ) : null}
      <Input
        placeholder="Confirmación Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {isErrorConfirmPassword ? (
        <Text style={styles.error}>Las contraseñas no coinciden</Text>
      ) : null}
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <Button
        title="Registrarse"
        onPress={handleRegister}
        containerStyle={styles.button}
        disabled={
          email === "" ||
          password === "" ||
          confirmPassword === "" ||
          isErrorEmail ||
          isErrorPassword ||
          isErrorConfirmPassword ||
          isLoading
        }
      />
      <Button
        title="Volver al Login"
        type="outline"
        onPress={() => navigation.navigate("Login")}
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
