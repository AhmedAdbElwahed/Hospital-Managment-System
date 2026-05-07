"use client";

import { useDashboardStats, useRecentAppointments } from "@/hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, CalendarDays, BedDouble, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentAppointments, isLoading: appointmentsLoading } = useRecentAppointments();

  const cards = [
    {
      title: "Total Patients",
      value: stats?.totalPatients || "2,450",
      icon: Users,
      trend: "+12%",
      isPositive: true,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Today's Appointments",
      value: stats?.todayAppointments || "42",
      icon: CalendarDays,
      trend: "+5%",
      isPositive: true,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Active Admissions",
      value: stats?.activeAdmissions || "128",
      icon: BedDouble,
      trend: "-2%",
      isPositive: false,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      title: "Clinic Efficiency",
      value: "94%",
      icon: TrendingUp,
      trend: "+3%",
      isPositive: true,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Health Overview</h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 rounded-xl border-indigo-100 text-indigo-600 hover:bg-indigo-50 font-semibold">
            Download Report
          </Button>
          <Button className="h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 font-semibold">
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <Card key={i} className="border-none shadow-xl shadow-indigo-50/40 overflow-hidden group hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`${card.bg} p-2.5 rounded-xl transition-transform group-hover:rotate-6`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                  card.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}>
                  {card.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {card.trend}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-tight">{card.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">
                  {statsLoading ? "..." : card.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-xl shadow-indigo-50/40">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Patient Admissions</CardTitle>
              <CardDescription className="text-xs">Weekly admission trends per department</CardDescription>
            </div>
            <Activity className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-slate-50/50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center">
              <p className="text-gray-400 text-sm font-medium">Chart visualization placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-xl shadow-indigo-50/40">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Upcoming Sessions</CardTitle>
              <Clock className="h-5 w-5 text-indigo-600" />
            </div>
            <CardDescription className="text-xs">Scheduled for the next 4 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {appointmentsLoading ? (
                [1, 2, 3].map(i => <div key={i} className="h-16 w-full bg-slate-50 animate-pulse rounded-xl" />)
              ) : (
                recentAppointments?.map((apt, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors duration-300">
                      <CalendarDays className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{apt.patientName || "Sarah Johnson"}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{apt.reasonForVisit || "Routine Checkup"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-900">09:30 AM</p>
                      <Badge variant="outline" className="mt-1 text-[9px] uppercase font-bold text-indigo-600 border-indigo-100 bg-indigo-50/50">
                        In-person
                      </Badge>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-10">
                    <p className="text-gray-400 text-sm font-medium">No upcoming appointments</p>
                  </div>
                )
              )}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-indigo-600 hover:bg-indigo-50 text-xs font-bold uppercase tracking-wider h-10 rounded-xl">
              View All Appointments
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function for class names
import { cn } from "@/lib/utils";
