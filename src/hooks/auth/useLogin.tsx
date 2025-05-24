import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import Cookies from "js-cookie";
import type { UserType } from "../../types";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  userType: UserType;
  authentication: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: LoginPayload): Promise<LoginResponse> => {
      const { data } = await axiosInstance.post<LoginResponse>(
        "/auth/authenticate",
        { userName: username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      Cookies.set("authToken", data.authentication, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    },
    onError: () => {},
  });
};
