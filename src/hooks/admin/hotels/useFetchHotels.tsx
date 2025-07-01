import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Hotel } from "../../../types/hotel_types";
import { axiosInstance } from "../../../lib/Axios";

export function useFetchHotels({
  pageNumber = 1,
  pageSize = 5,
  searchQuery = "",
}: {
  pageNumber: number;
  pageSize?: number;
  searchQuery?: string;
}) {
  return useQuery({
    queryKey: ["hotels", pageNumber, pageSize, searchQuery],

    queryFn: async () => {
      keepPreviousData;
      try {
        const params = new URLSearchParams();
        params.append("pageNumber", pageNumber.toString());
        params.append("pageSize", pageSize.toString());
        if (searchQuery) {
          params.append("searchQuery", searchQuery);
        }

        const { data } = await axiosInstance.get<Hotel[]>(
          `/hotels?${params.toString()}`
        );

        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  });
}
