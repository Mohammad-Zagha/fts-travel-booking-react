import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import type { Destination } from "../../types";

export function useFetchDestinations() {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<Destination[]>(
          `home/destinations/trending`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    placeholderData: keepPreviousData,
  });
}
