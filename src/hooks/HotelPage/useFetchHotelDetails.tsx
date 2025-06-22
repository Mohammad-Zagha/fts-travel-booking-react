import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import type { Hotel } from "../../types/hotel_types";

export function useFetchHotelDetails({ id }: { id: string }) {
  return useQuery({
    queryKey: ["hotel-details", id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<Hotel>(`/hotels/${id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
}
