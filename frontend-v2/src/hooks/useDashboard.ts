import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  activeAdmissions: number;
  efficiencyRate: number;
}

export interface AdmissionTrend {
  date: string;
  count: number;
}

export interface RecentActivity {
  id: string | number;
  type: string;
  message: string;
  timestamp: string;
}

export interface DepartmentDistribution {
  departmentName: string;
  patientCount: number;
  percentage: number;
}

export interface AppointmentSession {
  id?: number;
  startTime: string;
  reasonForVisit: string;
  doctorName: string;
  patientName: string;
  appointmentStatus: string;
  virtual: boolean;
  createdAt?: string;
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      // Trying /hms/v1 prefix as it's more common in the project for other controllers
      // If /hms/v1/dashboard/summary fails with 404, we'll know the prefix was correct but the request was bad
      const response = await axiosInstance.get<DashboardStats>(
        "/hms/v1/dashboard/summary",
      );
      return response.data;
    },
  });
}

export function useAdmissionTrends() {
  return useQuery({
    queryKey: ["admissionTrends"],
    queryFn: async () => {
      const response = await axiosInstance.get<AdmissionTrend[]>(
        "/hms/v1/dashboard/trends/admissions",
      );
      return response.data;
    },
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ["recentActivity"],
    queryFn: async () => {
      const response = await axiosInstance.get<RecentActivity[]>(
        "/hms/v1/dashboard/recent-activity",
      );
      return response.data;
    },
  });
}

export function useDepartmentDistribution() {
  return useQuery({
    queryKey: ["departmentDistribution"],
    queryFn: async () => {
      const response = await axiosInstance.get<DepartmentDistribution[]>(
        "/hms/v1/dashboard/distribution/department",
      );
      return response.data;
    },
  });
}

export function useRecentAppointments() {
  return useQuery({
    queryKey: ["todayAppointments"],
    queryFn: async () => {
      const response = await axiosInstance.get<AppointmentSession[]>(
        "/hms/v1/dashboard/today-appointments",
      );
      return response.data;
    },
  });
}
