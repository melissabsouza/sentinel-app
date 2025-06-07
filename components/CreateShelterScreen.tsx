import React from "react";
import { Alert } from "react-native";
import ShelterForm from "../components/ShelterForm";
import { ShelterFormValues } from "../types/Shelter";
import { shelterService } from "../services/shelters";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

const CreateShelterScreen = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSubmit = async (data: ShelterFormValues) => {
    try {
      await shelterService.create(data);
      Alert.alert("Sucesso!", "Abrigo criado com sucesso!");
      await queryClient.invalidateQueries({
        queryKey: ["shelters"],
      });
      router.back();
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível criar o abrigo."
      );
      console.error(error);
    }
  };

  return <ShelterForm onSubmit={handleSubmit} />;
};

export default CreateShelterScreen;
