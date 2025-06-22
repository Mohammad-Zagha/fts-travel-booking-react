import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import type { HotelGallery } from "../../types/hotel_types";

export function useFetchHotelGallery({ id }: { id: string }) {
  return useQuery({
    queryKey: ["hotel-gallery", id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<HotelGallery[]>(
          `/hotels/${id}/gallery`
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
