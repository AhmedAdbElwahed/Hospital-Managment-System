import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      // In a real scenario, we'd have a single /stats endpoint.
      // For now, we aggregate or use placeholders if endpoints are missing.
      const [patients, appointments, admissions, wards] = await Promise.all([
        axiosInstance.get("/api/v1/patients?page=0&size=1"),
        axiosInstance.get("/api/v1/appointments?page=0&size=1"),
        axiosInstance.get("/api/v1/admissions?pageSize=1"),
        axiosInstance.get("/hms/v1/ward"),
      ]);

      return {
        totalPatients: (patients.data as any[]).length, // Placeholder logic
        todayAppointments: (appointments.data as any[]).length,
        activeAdmissions: (admissions.data as any[]).length,
        totalWards: (wards.data as any[]).length,
      };
    },
  });
}

export function useRecentAppointments() {
  return useQuery({
    queryKey: ["recentAppointments"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/appointments?page=0&size=5");
      return response.data as any[];
    },
  });
}
