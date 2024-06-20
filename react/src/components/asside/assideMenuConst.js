import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import PaymentIcon from '@mui/icons-material/Payment';

export const Itemsasside = [
  {
    id: 0,
    name: "Dashboard",
    path: "/",
    // icon:"/assets/dashboard.svg",
    icon: <DashboardIcon/>,
    selection: true,
  },
  {
    id: 1,
    name: "Appointments",
    path: "/appointments",
    // icon: "/assets/Appointments.svg",
    icon: <AccessTimeFilledIcon/>,
    selection: false,
  },
  {
    id: 2,
    name: "Doctors",
    path: "/doctors",
    // icon: `/assets/doctor icon.svg`,
    icon: <Diversity2Icon/>,
    selection: false,
  },
  {
    id: 3,
    name: "Payment",
    path: "/payment",
    // icon: `/assets/Payment.svg`,
    icon: <PaymentIcon/>,
    selection: false,
  },
];


