import * as React from 'react';
import {Button, CircularProgress} from "@mui/material";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport, GridToolbarFilterButton
} from "@mui/x-data-grid";
import {Add} from "@mui/icons-material";
import {Link} from "react-router-dom";

const DoctorDataTable = ({rows , cols, error, isLoading}) => {

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton/>
                <Link to="/doctors/create-doctor" className="text-[#1976d2] h-full p-1 rounded-lg hover:bg-sky-800 hover:bg-opacity-5"><Add/>
                    <span className="font-thin text-[13px] ">ADD DOCTOR</span>
                </Link>
            </GridToolbarContainer>
        );
    }


    return (
        <div style={{height: 600, width: '100%'}}>
            {
                !error ? (
                    isLoading ? (
                        <CircularProgress/>
                    ) : (
                        <DataGrid
                            rows={rows}
                            columns={cols}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize: 6},
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            rowSelection={true}
                            slots={{
                                toolbar: CustomToolbar
                            }}

                        />)

                ) : (
                    <h1>Can not fetch Doctors</h1>
                )
            }

        </div>
    );
}

export default DoctorDataTable;