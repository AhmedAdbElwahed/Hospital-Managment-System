import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/user");
      return response.data;
    },
  });
}
