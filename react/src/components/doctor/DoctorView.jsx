import TableHeader from "../shared/TableHeader";
import DataTable from "../shared/DataTable";
import {Outlet} from "react-router-dom";

const DoctorView = () => {
    return (
        <section className=" py-6 w-full gap-10 px-5 h-full flex flex-col ">
            <h1 className="font-nunito-sans text-2xl font-bold ">Doctors</h1>
            <TableHeader />
            <DataTable/>
        </section>
    )
}

export default DoctorView;
