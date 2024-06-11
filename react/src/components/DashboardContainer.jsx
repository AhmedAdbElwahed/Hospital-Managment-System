import { useState } from "react";

import { useEffect } from "react";
import Asside from "./asside/Asside";
import Header from "./header/Header";
import Dashboard from "./dashboard/Dashboard";
import Appointments from "./appointments/Appointments";
import Payment from "./payment/Payment";
import Setting from "./setting/Setting";
import DoctorView from "./doctor/DoctorView";



export default function DashboardContainer() {
  const [pages, setPages] = useState(0)
  const [assetControl, setAssetControl] = useState(false)
  const changePages = (index) => {
    setPages(index)
  }
  const assetControlFunc = () => {
    setAssetControl(!assetControl)
  }
  useEffect(() => {
   
    const isMobile = window.matchMedia("(min-width: 767px)").matches;
    if(isMobile)setAssetControl(true);

    
  }, []);
 
  return (

    <div className="flex w-full  justify-end  h-screen bg-[#f5f6fa]">
      {assetControl &&
        
          <Asside pages={changePages} control={assetControlFunc} />
        

      }

      <div className="w-full lg:w-[80%] flex flex-col ">
        <Header controlAsside={assetControlFunc} />
        {pages === 0 &&
          <Dashboard />
        }
        {pages === 1 &&
          <Appointments pages={changePages} />
        }
        {pages === 2 &&
        <DoctorView pages={changePages}/>}
        {pages === 3 &&
          <Payment pages={changePages} />
        }
        {pages === 5 &&
          <Setting pages={changePages} />
        }
      </div>
    </div>

  )
}
