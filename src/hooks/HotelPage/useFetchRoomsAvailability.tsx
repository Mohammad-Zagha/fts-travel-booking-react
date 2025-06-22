import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import type { RoomAvailability } from "../../types/hotel_types";

export function useFetchRoomsAvailability({ id }: { id: string }) {
  return useQuery({
    queryKey: ["rooms-availability", id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<RoomAvailability[]>(
          `/hotels/${id}/available-rooms`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
}
