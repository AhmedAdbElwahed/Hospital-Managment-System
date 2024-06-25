import React from 'react';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Chip from "@mui/material/Chip";
import dayjs from "dayjs";

function createData(name, calories, fat) {
    return {name, calories, fat};
}

const rows = [
    createData(159, 'Frozen yoghurt', "Male"),
    createData(237, 'Ice cream sandwich', "Male"),
    createData(262, 'Eclair', "Male"),
    createData(305, 'Cupcake', "Male"),
    createData(356, 'Gingerbread', "Male"),
];

const PatientCard = ({recentPatients}) => {
    return (
        <TableContainer>
            <Table sx={{minWidth: 400}} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><span className="font-semibold">ID</span></TableCell>
                        <TableCell><span className="font-semibold">Name/Age</span></TableCell>
                        <TableCell><span className="font-semibold">Gender</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recentPatients.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            <TableCell>
                                <Chip sx={{
                                    minWidth: 60
                                }} label={row.id}/>
                            </TableCell>
                            <TableCell>
                                <p className="text-sm font-bold text-[#2761ef]">
                                    {`${row.requiredInfoDto.firstname} ${row.requiredInfoDto.lastname}`}
                                </p>
                                <span className="font-light text-xs text-gray-500">
                                 {dayjs().diff(dayjs(row.requiredInfoDto.dob), "years")}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="text-[#2761ef] rounded-sm bg-[#2761ef]/10 p-1">
                                    {row.requiredInfoDto.gender.toLowerCase()}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PatientCard;