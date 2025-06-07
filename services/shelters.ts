import { apiClient } from "./api";
import {
  Shelter,
  ShelterCreateInput,
} from "../types/Shelter";

const RESOURCE = "shelters";

export const shelterService = {
  getAll: async (): Promise<Shelter[]> => {
    const { data } = await apiClient.get<Shelter[]>(
      `/api/${RESOURCE}`
    );
    return data;
  },

  getById: async (id: number): Promise<Shelter> => {
    const { data } = await apiClient.get<Shelter>(
      `/api/${RESOURCE}/${id}`
    );
    return data;
  },

  create: async (
    shelter: ShelterCreateInput
  ): Promise<Shelter> => {
    const { data } = await apiClient.post<Shelter>(
      `/api/${RESOURCE}`,
      shelter
    );
    return data;
  },

  updateById: async (
    id: number,
    shelter: Partial<Shelter>
  ): Promise<Shelter> => {
    const { data } = await apiClient.put<Shelter>(
      `/api/${RESOURCE}/update/${id}`,
      shelter
    );
    return data;
  },

  deleteById: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/${RESOURCE}/delete/${id}`);
  },
};
