import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { User, signOut } from "firebase/auth";
import { Rubik_400Regular } from "@expo-google-fonts/rubik/400Regular";
import { Rubik_500Medium } from "@expo-google-fonts/rubik/500Medium";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace("/login");
            } catch (error) {
              console.error("Erro ao fazer logout:", error);
              Alert.alert(
                "Erro",
                "Não foi possível sair da conta"
              );
            }
          },
        },
      ]
    );
  };

  if (loading || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4AB64A" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Usuário não encontrado
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#424242"
        />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons
            name="person-circle"
            size={140}
            color="#ffdb58"
          />
        </View>
        <Text style={styles.welcomeText}>Meu Perfil</Text>
      </View>

      {/* User Info Cards */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="person"
              size={20}
              color="#ffdb58"
            />
            <Text style={styles.cardTitle}>Nome</Text>
          </View>
          <Text style={styles.cardValue}>
            {user.displayName || "Nome não informado"}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="mail"
              size={20}
              color="#ffdb58"
            />
            <Text style={styles.cardTitle}>E-mail</Text>
          </View>
          <Text style={styles.cardValue}>
            {user.email || "E-mail não informado"}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="calendar"
              size={20}
              color="#ffdb58"
            />
            <Text style={styles.cardTitle}>
              Membro desde
            </Text>
          </View>
          <Text style={styles.cardValue}>
            {user.metadata.creationTime
              ? new Date(
                  user.metadata.creationTime
                ).toLocaleDateString("pt-BR")
              : "Data não disponível"}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>
            Sair da Conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 8,
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    paddingTop: 60,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  welcomeText: {
    fontFamily: "Rubik_500Medium",
    fontSize: 28,
    color: "#424242",
    textAlign: "center",
  },
  infoContainer: {
    flex: 1,
    paddingTop: 20,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: "Rubik_500Medium",
    fontSize: 16,
    color: "#424242",
    marginLeft: 10,
  },
  cardValue: {
    fontFamily: "Rubik_400Regular",
    fontSize: 18,
    color: "#666",
    marginLeft: 30,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ffdb58",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  editButtonText: {
    fontFamily: "Rubik_500Medium",
    fontSize: 16,
    color: "#ffdb58",
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dc8335",
    borderRadius: 12,
    padding: 16,
  },
  logoutButtonText: {
    fontFamily: "Rubik_500Medium",
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
  },
  errorText: {
    fontFamily: "Rubik_400Regular",
    fontSize: 16,
    color: "#dc3545",
    textAlign: "center",
    marginTop: 50,
  },
});
