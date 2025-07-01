import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/Axios";
import type { City } from "../../../types";

export function useFetchCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<City[]>(`/cities`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    placeholderData: keepPreviousData,
  });
}
