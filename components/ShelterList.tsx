import React from "react";
import { FlatList, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useGetShelters } from "../services/getShelter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shelterService } from "../services/shelters";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Rubik_600SemiBold } from '@expo-google-fonts/rubik/600SemiBold';
import { Rubik_500Medium } from '@expo-google-fonts/rubik/500Medium';
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";

export const ShelterList = () => {

    const router = useRouter()
    const [fontsLoaded] = useFonts({
            Rubik_600SemiBold,
            Rubik_500Medium
        })
  const queryClient = useQueryClient();

  const { data: shelters, isLoading } = useGetShelters();

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: (id) => shelterService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shelters"] });
    },
  });

  if (isLoading) return <ActivityIndicator size="large" color="#ffdb58" />;


  return (
    <FlatList
      data={shelters}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.name}</Text>

          <Text style={[styles.status, item.status === 'OPEN' ? styles.open : styles.closed]}>
            {item.status}
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Capacidade Total: 
                <Text style={styles.value}> {' '}{item.totalCapacity}</Text>
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Capacidade Atual:
            <Text style={styles.value}>  {' '}{item.currentCapacity}</Text>
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Recursos Disponíveis:
                <Text style={styles.value}>  {' '}{item.availableResources}</Text>
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Última Atualização:</Text>
            <Text style={styles.value}>  {' '}{new Date(item.lastUpdate).toLocaleString()}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Endereço:
            <Text style={styles.value}>  {' '}
              {`${item.address.street}, ${item.address.number} - ${item.address.district}, ${item.address.city} - ${item.address.state} - CEP: ${item.address.cep}`}
            </Text>
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Contato:</Text>
            <Text style={styles.value}>
              {item.contact.email} | {item.contact.phone}
            </Text>
          </View>

          <View style={styles.icons}>
                <TouchableOpacity
                    onPress={() => deleteMutation.mutate(item.id)}
                    style={{ padding: 8 }}
                >
                    <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>


                <TouchableOpacity
                style={{ padding: 8 }}
                onPress={() => router.push({ pathname: "/edit/[id]", params: { id: item.id.toString() } })}
              >
                <Ionicons name="pencil" size={24} color="#424242" />
                </TouchableOpacity>
          </View >
        </View>
      )}
    />
  );
};

export default ShelterList;

export const styles = StyleSheet.create({
  icons:{
    flexDirection: 'row',
    alignSelf: 'center'
    },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    width: '90%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
    fontFamily: 'Rubik_500Medium',
  },
  status: {
    fontWeight: '600',
    marginBottom: 10,
  },
  open: {
    color: '#4AB64A',
    fontFamily: 'Rubik_500Medium',
  },
  closed: {
    color: '#D14343',
    fontFamily: 'Rubik_500Medium',
  },
  infoRow: {
    flexDirection: 'column',
    marginBottom: 6,
  },
  label: {
    fontWeight: '600',
    color: '#555',
    fontFamily: 'Rubik_600SemiBold'
  },
  value: {
    color: '#666',
    fontFamily: 'Rubik_500Medium',
    marginLeft: 4,
  },
  deleteText: {
    marginTop: 10,
    color: '#D14343',
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
