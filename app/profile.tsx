import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileScreen from "@/components/ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <ProfileScreen />
    // </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
