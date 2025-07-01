import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/Axios";
import type { Room } from "../../../types";

export function useFetchRooms({ id }: { id: number }) {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<Room[]>(`/hotels/${id}/rooms`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    placeholderData: keepPreviousData,
  });
}
