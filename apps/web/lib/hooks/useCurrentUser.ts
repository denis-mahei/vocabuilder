import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api/client-api";
import axios from "axios";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          return false;
        }
        if (error.response?.status >= 500) {
          return failureCount < 3;
        }
      }
      return false;
    },
  });
};
