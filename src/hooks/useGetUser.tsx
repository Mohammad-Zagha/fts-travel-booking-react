import { useQuery } from "@tanstack/react-query";
import type { UserInfo } from "../types";
import { getUserInfo } from "../lib/utils";

export function useUserInfo() {
  return useQuery<UserInfo | null>({
    queryKey: ["userInfo"],
    queryFn: () => Promise.resolve(getUserInfo()),
  });
}
