import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text h4>Perfil</Text>
      <Button
        title="Cerrar Sesión"
        type="outline"
        containerStyle={styles.button}
        onPress={logout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});
