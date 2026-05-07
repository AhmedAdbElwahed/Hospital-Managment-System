import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { 
  DoctorDto, 
  DoctorResponseDto, 
  Pageable, 
  DoctorFilters,
  PageDoctorResponseDto
} from "@/types/doctor";

export function useDoctors(pageable: Pageable, filters?: DoctorFilters, options?: any) {
  return useQuery({
    queryKey: ["doctors", pageable, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", pageable.page.toString());
      params.append("size", pageable.size.toString());
      if (pageable.sort) {
        pageable.sort.forEach(s => params.append("sort", s));
      }

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== "" && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response = await axiosInstance.get<PageDoctorResponseDto>("/api/v1/doctor", { params });
      return response.data;
    },
    ...options
  });
}

export function useDoctor(id: number) {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const response = await axiosInstance.get<DoctorResponseDto>(`/api/v1/doctor/get-by-id/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useSearchDoctors(keyword: string, pageable: Pageable, options?: any) {
  return useQuery({
    queryKey: ["doctors", "search", keyword, pageable],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("keyword", keyword);
      params.append("page", pageable.page.toString());
      params.append("size", pageable.size.toString());
      if (pageable.sort) {
        pageable.sort.forEach(s => params.append("sort", s));
      }

      const response = await axiosInstance.get<PageDoctorResponseDto>("/api/v1/doctor/search", {
        params
      });
      return response.data;
    },
    enabled: !!keyword,
    ...options
  });
}

export function useDoctorAvailableTime(id: number) {
  return useQuery({
    queryKey: ["doctor", "available-time", id],
    queryFn: async () => {
      const response = await axiosInstance.get<string[]>(`/api/v1/doctor/get-available-time/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useDoctorAppointments() {
  return useQuery({
    queryKey: ["doctor", "appointments"],
    queryFn: async () => {
      const response = await axiosInstance.get<any>("/api/v1/doctor/appointments");
      return response.data;
    },
  });
}

export function useRegisterDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (doctor: DoctorDto) => {
      const response = await axiosInstance.post<string>("/api/v1/doctor/register", doctor);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}

export function useUpdateDoctor(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (doctor: DoctorDto) => {
      const response = await axiosInstance.put<DoctorResponseDto>(`/api/v1/doctor/update-by-id/${id}`, doctor);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor", id] });
    },
  });
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/api/v1/doctor/delete-by-id/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}
