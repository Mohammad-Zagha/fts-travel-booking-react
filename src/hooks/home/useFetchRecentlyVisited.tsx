import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import type { RecentlyVisited } from "../../types";
import { useAuth } from "../../context/authContext";

export function useFetchRecentlyVisited() {
  const { userInfo } = useAuth();
  const userId = userInfo?.user_id;

  return useQuery({
    queryKey: ["recently-visited", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<RecentlyVisited[]>(
        `/home/users/${userId}/recent-hotels`
      );
      return data;
    },
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
}
