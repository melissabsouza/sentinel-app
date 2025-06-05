import { useQuery } from "@tanstack/react-query";
import { shelterService } from "./shelters";

export const useGetShelters = () => {
  return useQuery({
    queryKey: ["shelters"],
    queryFn: shelterService.getAll,
  });
};
