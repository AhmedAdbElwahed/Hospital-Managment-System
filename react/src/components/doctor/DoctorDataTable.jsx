import * as React from 'react';
import {CircularProgress} from "@mui/material";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import {Add} from "@mui/icons-material";
import CustomNoRowsOverlay from "../shared/CustomNoRowsOverlay";

const DoctorDataTable = ({rows, cols, error, isLoading}) => {

    const CustomDataGridToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport csvOptions={{
                    fileName: "Doctors"
                }}/>
                <GridToolbarColumnsButton/>
                <GridToolbarFilterButton/>
                <Link to="/doctors/create-doctor"
                      className="text-[#1976d2] h-full p-1 rounded-lg hover:bg-sky-800 hover:bg-opacity-5"><Add/>
                    <span className="font-thin text-[13px] ">ADD DOCTOR</span>
                </Link>
            </GridToolbarContainer>
        );
    }


    return (
        <div className="p-4 bg-white rounded-lg">
            <div style={{height: 500, width: '100%'}} className="bg-white border border-[#f4f4f4]">
                {
                    !error ? (
                        isLoading ? (
                            <CircularProgress/>
                        ) : (
                            <DataGrid
                                sx={{
                                    '& .MuiDataGrid-columnHeader': {
                                        backgroundColor: "#f4f4f4",
                                    },
                                }}
                                rows={rows}
                                columns={cols}
                                initialState={{
                                    pagination: {
                                        paginationModel: {page: 0, pageSize: 6},
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                disableRowSelectionOnClick
                                slots={{
                                    toolbar: CustomDataGridToolbar,
                                    noRowsOverlay: CustomNoRowsOverlay
                                }}
                                slotProps={{
                                    toolbar: {
                                        csvOptions: {
                                            fields: ['action']
                                        }
                                    }
                                }}

                            />)

                    ) : (
                        <h1>Can not fetch Doctors</h1>
                    )
                }

            </div>
        </div>
    );
}

export default DoctorDataTable;