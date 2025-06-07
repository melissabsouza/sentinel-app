import React from "react";
import {
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  useRouter,
  useLocalSearchParams,
} from "expo-router";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import ShelterForm from "../components/ShelterForm";
import { shelterService } from "../services/shelters";
import { ShelterFormValues } from "../types/Shelter";

const EditShelterScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const queryClient = useQueryClient();

  if (!id) {
    Alert.alert("Erro", "ID do abrigo não informado!");
    return null;
  }

  const shelterId = Number(id);

  const {
    data: shelter,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shelter", shelterId],
    queryFn: () => shelterService.getById(shelterId),
    enabled: !!shelterId,
  });

  const mutation = useMutation({
    mutationFn: (data: ShelterFormValues) =>
      shelterService.updateById(shelterId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shelter", shelterId],
      });
      queryClient.invalidateQueries({
        queryKey: ["shelters"],
      });

      Alert.alert(
        "Sucesso!",
        "Abrigo atualizado com sucesso!"
      );
      router.back();
    },
    onError: () => {
      Alert.alert(
        "Erro",
        "Não foi possível atualizar o abrigo."
      );
    },
  });

  const handleSubmit = (data: ShelterFormValues) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !shelter) {
    Alert.alert(
      "Erro",
      "Erro ao carregar dados do abrigo."
    );
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <ShelterForm
        initialValues={shelter}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default EditShelterScreen;
