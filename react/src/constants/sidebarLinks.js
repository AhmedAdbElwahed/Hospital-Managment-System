import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from "@mui/icons-material/Logout";
import {HospitalIcon} from "lucide-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBedPulse, faHospitalUser, faIdCardClip, faThermometer, faUserDoctor} from "@fortawesome/free-solid-svg-icons";

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
    icon: <FontAwesomeIcon className="w-[26px] h-[26px]" icon={faUserDoctor} />,
  },
  {
    name: "Patients",
    path: "/patients",
    icon: <FontAwesomeIcon className="w-[26px] h-[26px]" icon={faHospitalUser} />,
  },
  {
    name: "Admission",
    path: "/admission",
    icon: <FontAwesomeIcon className="w-[24px] h-[24px]" icon={faIdCardClip} />,
  },
  {
    name: "Examination",
    path: "/examination",
    icon: <FontAwesomeIcon className="w-[24px] h-[24px]" icon={faThermometer} />,
  },
  {
    name: "Wards",
    path: "/wards",
    icon: <FontAwesomeIcon className="w-[24px] h-[24px]" icon={faBedPulse} />,
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


