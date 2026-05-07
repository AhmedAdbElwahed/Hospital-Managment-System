"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PatientResponseDto } from "@/types/patient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PatientsTableProps {
  patients: PatientResponseDto[] | undefined;
  isLoading: boolean;
  onEdit: (patient: PatientResponseDto) => void;
  onDelete: (id: number) => void;
}

export function PatientsTable({
  patients,
  isLoading,
  onEdit,
  onDelete,
}: PatientsTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <UserRound className="h-8 w-8 text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No patients found</h3>
        <p className="text-gray-500 text-sm mt-1">
          Start by adding a new patient to the system.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow className="hover:bg-transparent border-gray-100">
            <TableHead className="font-bold text-gray-900 h-14">Patient</TableHead>
            <TableHead className="font-bold text-gray-900 h-14">Gender</TableHead>
            <TableHead className="font-bold text-gray-900 h-14">Blood Type</TableHead>
            <TableHead className="font-bold text-gray-900 h-14">Contact</TableHead>
            <TableHead className="font-bold text-gray-900 h-14 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              className="hover:bg-indigo-50/30 transition-colors border-gray-100"
            >
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
                    {patient.requiredInfoDto.firstname[0]}
                    {patient.requiredInfoDto.lastname[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {patient.requiredInfoDto.firstname}{" "}
                      {patient.requiredInfoDto.lastname}
                    </p>
                    <p className="text-xs text-gray-500">
                      DOB: {patient.requiredInfoDto.dob}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "font-semibold px-2.5 py-0.5 rounded-lg",
                    patient.requiredInfoDto.gender === "MALE"
                      ? "bg-blue-50 text-blue-600 border-blue-100"
                      : "bg-pink-50 text-pink-600 border-pink-100"
                  )}
                >
                  {patient.requiredInfoDto.gender}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="font-medium text-gray-700">
                  {patient.additionalInfoDto.bloodType?.replace("_", " ") || "N/A"}
                </span>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <p className="text-gray-900 font-medium">
                    {patient.requiredInfoDto.email}
                  </p>
                  <p className="text-gray-500">{patient.requiredInfoDto.phone}</p>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-indigo-50 rounded-lg"
                      >
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </Button>
                    }
                  />
                  <DropdownMenuContent
                    align="end"
                    className="w-40 rounded-xl border-gray-100 shadow-xl p-1"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs font-bold text-gray-400 uppercase px-2 py-1.5">
                        Options
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        className="rounded-lg gap-2 cursor-pointer focus:bg-indigo-50 focus:text-indigo-600"
                        onClick={() => onEdit(patient)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="font-medium">Edit Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-50" />
                      <DropdownMenuItem
                        className="rounded-lg gap-2 cursor-pointer focus:bg-rose-50 text-rose-600 focus:text-rose-700"
                        onClick={() => onDelete(patient.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="font-medium">Delete Patient</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
