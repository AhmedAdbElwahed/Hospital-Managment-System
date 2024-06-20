import "../App.css"
import {Outlet} from "react-router-dom";
import SideBar from "../components/shared/SideBar";

const Layout = () => {
    return (
        <div>
            <SideBar outlet={<Outlet/>}/>
        </div>
    )
}

export default Layout;