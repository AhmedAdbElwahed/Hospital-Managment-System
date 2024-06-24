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

    console.log(rows);

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
        <div style={{height: 500, width: '100%'}}>
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
                                sorting: {
                                    sortModel: [{ field: 'startTime', sort: 'asc' }],
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
    );
};

export default AppointmentsDataTable;