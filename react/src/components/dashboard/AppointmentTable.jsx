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
import {stringAvatar} from "../../util/additionalFunc";


const AppointmentTable = ({todayAppointments}) => {
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
                    {todayAppointments.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            <TableCell>
                                <Avatar sx={
                                    {
                                        width: 30,
                                        height: 30,
                                        bgcolor: stringAvatar(row.patientName).sx.bgcolor,
                                    }
                                }

                                >
                                    <Typography variant="subtitle2">
                                        {stringAvatar(row.patientName).children}
                                    </Typography>
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                <p className="text-sm font-bold text-[#2761ef]">{row.patientName}</p>
                                <span className="font-light text-xs text-gray-500">{row.reasonForVisit}</span>
                            </TableCell>
                            <TableCell>
                                <span className="text-[#2761ef] rounded-sm bg-[#2761ef]/10 p-1">{row.startTime}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AppointmentTable;
