"use client";

import { useDashboardStats, useRecentAppointments, useAdmissionTrends, useDepartmentDistribution, useRecentActivity } from "@/hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, CalendarDays, BedDouble, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, PieChart as PieChartIcon, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ['#4f46e5', '#ec4899', '#10b981', '#f59e0b', '#f43f5e', '#6366f1', '#8b5cf6'];

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentAppointments, isLoading: appointmentsLoading } = useRecentAppointments();
  const { data: admissionTrends, isLoading: trendsLoading } = useAdmissionTrends();
  const { data: deptDistribution, isLoading: distributionLoading } = useDepartmentDistribution();
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity();

  const cards = [
    {
      title: "Total Patients",
      value: stats?.totalPatients || "0",
      icon: Users,
      trend: "+12%",
      isPositive: true,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Today's Appointments",
      value: stats?.todayAppointments || "0",
      icon: CalendarDays,
      trend: "+5%",
      isPositive: true,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Active Admissions",
      value: stats?.activeAdmissions || "0",
      icon: BedDouble,
      trend: "-2%",
      isPositive: false,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      title: "Clinic Efficiency",
      value: stats?.efficiencyRate ? `${Math.round(stats.efficiencyRate * 100)}%` : "0%",
      icon: TrendingUp,
      trend: "+3%",
      isPositive: true,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Health Overview</h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">Welcome back, here&apos;s what&apos;s happening today.</p>
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
              <CardDescription className="text-xs">Weekly admission trends</CardDescription>
            </div>
            <Activity className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="relative h-[300px] w-full min-h-0 min-w-0">
              {trendsLoading ? (
                <div className="h-full w-full bg-slate-50 animate-pulse rounded-xl" />
              ) : (
                <ResponsiveContainer width="100%" height="100%" debounce={100}>
                  <LineChart data={admissionTrends || []} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" vertical={false} />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5' }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-xl shadow-indigo-50/40">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Department Distribution</CardTitle>
              <CardDescription className="text-xs">Current patient allocation</CardDescription>
            </div>
            <PieChartIcon className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="relative h-[300px] w-full min-h-0 min-w-0">
              {distributionLoading ? (
                <div className="h-full w-full bg-slate-50 animate-pulse rounded-xl" />
              ) : (
                <ResponsiveContainer width="100%" height="100%" debounce={100}>
                  <PieChart>
                    <Pie
                      data={deptDistribution || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="patientCount"
                      nameKey="departmentName"
                    >
                      {(deptDistribution || []).map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-xl shadow-indigo-50/40">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
              <CardDescription className="text-xs">Latest actions across the system</CardDescription>
            </div>
            <Bell className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {activityLoading ? (
                [1, 2, 3, 4].map(i => <div key={i} className="h-12 w-full bg-slate-50 animate-pulse rounded-xl" />)
              ) : (
                recentActivity?.map((activity: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                    <div className="h-2 w-2 rounded-full bg-indigo-500 mt-1 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                    <Badge variant="secondary" className="text-[10px] text-gray-500 bg-gray-100">
                      {activity.type}
                    </Badge>
                  </div>
                )) || (
                   <div className="text-center py-10">
                    <p className="text-gray-400 text-sm font-medium">No recent activity</p>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-xl shadow-indigo-50/40">
          <CardHeader className="flex flex-row items-center justify-between">
             <div>
              <CardTitle className="text-lg font-bold">Upcoming Sessions</CardTitle>
              <CardDescription className="text-xs">Scheduled for the next 4 hours</CardDescription>
            </div>
            <Clock className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {appointmentsLoading ? (
                [1, 2, 3].map(i => <div key={i} className="h-16 w-full bg-slate-50 animate-pulse rounded-xl" />)
              ) : (
                recentAppointments?.map((apt: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors duration-300">
                      <CalendarDays className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{apt.patientName || "Sarah Johnson"}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{apt.reasonForVisit || "Routine Checkup"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-900">{apt.startTime || "09:30 AM"}</p>
                      <Badge variant="outline" className="mt-1 text-[9px] uppercase font-bold text-indigo-600 border-indigo-100 bg-indigo-50/50">
                        {apt.virtual ? "Virtual" : "In-person"}
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
