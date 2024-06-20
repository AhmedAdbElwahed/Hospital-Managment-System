import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from "@mui/icons-material/Logout";
import {HospitalIcon} from "lucide-react";

export const sidebarLinksTop = [
  {
    name: "Dashboard",
    path: "/",
    icon: <DashboardIcon/>,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <AccessTimeFilledIcon/>,
  },
  {
    name: "Doctors",
    path: "/doctors",
    icon: <Diversity2Icon/>,
  },
  {
    name: "Patients",
    path: "/patients",
    icon: <HospitalIcon/>,
  },
  {
    name: "Payment",
    path: "/payment",
    icon: <PaymentIcon/>,
  },
];

export const sidebarLinksBottom = [
  {
    name: "Settings",
    path: "/settings",
    icon: <SettingsIcon/>,
  },
  {
    name: "Logout",
    path: "#",
    icon: <LogoutIcon/>,
  },

];


