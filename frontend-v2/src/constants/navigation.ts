import { LayoutDashboard, Users, UserRound, CalendarDays, BedDouble, CreditCard } from "lucide-react";

export const SIDEBAR_LINKS = [
  {
    title: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: UserRound,
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Wards",
    href: "/wards",
    icon: BedDouble,
  },
  {
    title: "Billing",
    href: "/payment",
    icon: CreditCard,
  },
];
