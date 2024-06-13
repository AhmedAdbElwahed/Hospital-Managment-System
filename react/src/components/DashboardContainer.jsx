import { useState } from "react";

import { useEffect } from "react";
import Asside from "./asside/Asside";
import Header from "./header/Header";
import {Outlet} from "react-router-dom";



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
        <Outlet/>
      </div>
    </div>

  )
}
