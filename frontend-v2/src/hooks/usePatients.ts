import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import {
  PagePatientResponseDto,
  PatientDto,
  PatientResponseDto,
} from "@/types/patient";

export function usePatients(page = 0, size = 10) {
  return useQuery({
    queryKey: ["patients", page, size],
    queryFn: async () => {
      const response = await axiosInstance.get<PagePatientResponseDto>(
        `/api/v1/patients?page=${page}&size=${size}`,
      );
      return response.data;
    },
  });
}

export function usePatient(id: number | string) {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      const response = await axiosInstance.get<PatientResponseDto>(
        `/api/v1/patients/get-by-id/${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PatientDto) => {
      const response = await axiosInstance.post<string>(
        "/api/v1/patients/add-patient",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: PatientDto }) => {
      const response = await axiosInstance.put<PatientResponseDto>(
        `/api/v1/patients/update-patient/${id}`,
        data,
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["patient", variables.id] });
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/api/v1/patients/delete-by-id/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}

export function useSearchPatients(fullName: string, page = 0, size = 10) {
  return useQuery({
    queryKey: ["patients", "search", fullName, page, size],
    queryFn: async () => {
      const response = await axiosInstance.get<PagePatientResponseDto>(
        `/api/v1/patients/search-full-name?fullName=${fullName}&page=${page}&size=${size}`,
      );
      return response.data;
    },
    enabled: !!fullName,
  });
}
