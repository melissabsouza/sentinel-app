import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAuth } from "firebase/auth";

const firebaseAuth = getAuth();

export default function Menu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/add")}>
        <Ionicons
          name="add-circle-outline"
          color="#484C52"
          size={20}></Ionicons>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home")}>
        <Ionicons
          name="home-outline"
          color="#484C52"
          size={20}></Ionicons>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/profile")}>
        <Ionicons
          name="person-outline"
          color="#484C52"
          size={20}></Ionicons>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 8,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 11,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 50,
  },
  logout: {
    backgroundColor: "#ffdb58",
  },
  text: {
    fontSize: 16,
  },
});
