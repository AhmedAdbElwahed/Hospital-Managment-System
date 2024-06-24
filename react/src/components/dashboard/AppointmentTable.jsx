import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function createData(name, calories, fat) {
    return {name, calories, fat};
}

const rows = [
    createData(159,'Frozen yoghurt',  "16:00:00"),
    createData(237,'Ice cream sandwich',  "16:00:00"),
    createData(262,'Eclair',  "16:00:00"),
    createData(305,'Cupcake',  "16:00:00"),
    createData( 356,'Gingerbread', "16:00:00"),
];

const AppointmentTable = () => {
    return (
        <TableContainer>
            <Table sx={{minWidth: 400}} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><span className="font-semibold">Patient</span></TableCell>
                        <TableCell><span className="font-semibold">Name/Diagonsis</span></TableCell>
                        <TableCell><span className="font-semibold">Time</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                        >
                            <TableCell >
                                <Avatar sx={{ width: 30, height: 30 }}>
                                    <Typography variant="subtitle2">{row.name}</Typography>
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                <p className="text-sm font-bold text-[#2761ef]">{row.calories}</p>
                                <span className="font-light text-xs text-gray-500">{row.calories}</span>
                            </TableCell>
                            <TableCell>
                                <span className="text-[#2761ef] rounded-sm bg-[#2761ef]/10 p-1">{row.fat}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AppointmentTable;
