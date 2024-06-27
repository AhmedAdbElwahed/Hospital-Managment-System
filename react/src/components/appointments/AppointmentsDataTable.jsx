import React from 'react';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../shared/CustomNoRowsOverlay";
import {CircularProgress} from "@mui/material";


const AppointmentsDataTable = ({rows, cols, error, isLoading}) => {


    const CustomDataGridToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport csvOptions={{
                    fileName: "Doctors"
                }}/>
                <GridToolbarColumnsButton/>
                <GridToolbarFilterButton/>
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
                                    sorting: {
                                        sortModel: [{field: 'startTime', sort: 'asc'}],
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
                        <h1>Can not fetch Appointments</h1>
                    )
                }
            </div>
        </div>

    );
};

export default AppointmentsDataTable;