"use client";

import { useState, useEffect } from "react";
import {
  usePatients,
  useDeletePatient,
  useCreatePatient,
  useUpdatePatient,
  useSearchPatients,
} from "@/hooks/usePatients";
import { useDebounce } from "@/hooks/use-debounce";
import { PatientsTable } from "@/components/patients/PatientsTable";
import { PatientModal } from "@/components/patients/PatientModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, UserRound, X } from "lucide-react";
import { PatientDto, PatientResponseDto } from "@/types/patient";

export default function PatientsPage() {
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientResponseDto | null>(
    null
  );

  const debouncedSearch = useDebounce(searchTerm, 500);
  const isSearching = debouncedSearch.length > 0;

  // Reset page to 0 when search changes
  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const { data: listData, isLoading: isListLoading } = usePatients(page, size);
  const { data: searchData, isLoading: isSearchLoading } = useSearchPatients(
    debouncedSearch,
    page,
    size
  );

  const pageData = isSearching ? searchData : listData;
  const isLoading = isSearching ? isSearchLoading : isListLoading;

  const deletePatientMutation = useDeletePatient();
  const createPatientMutation = useCreatePatient();
  const updatePatientMutation = useUpdatePatient();

  const handleEdit = (patient: PatientResponseDto) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      await deletePatientMutation.mutateAsync(id);
    }
  };

  const handleAddNew = () => {
    setSelectedPatient(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data: PatientDto) => {
    try {
      if (selectedPatient) {
        await updatePatientMutation.mutateAsync({ id: selectedPatient.id, data });
      } else {
        await createPatientMutation.mutateAsync(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save patient:", error);
    }
  };

  const patients = pageData?.content || [];
  const offset = pageData?.pageable?.offset || 0 ;
  const totalPatients = pageData?.totalElements || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Patients Directory
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            Manage patient records and clinical information.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleAddNew}
            className="h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 font-semibold gap-2 px-5"
          >
            <Plus className="h-5 w-5" />
            Add New Patient
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-indigo-50 p-3 rounded-xl">
            <UserRound className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Patients
            </p>
            <h3 className="text-2xl font-bold text-gray-900">{totalPatients}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search patients by full name..."
            className="pl-10 h-11 rounded-xl border-gray-100 focus:ring-indigo-500 focus:border-indigo-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-3 w-3 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      <PatientsTable
        patients={patients}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-bold">{offset + patients.length}</span>{" "}
          of <span className="text-gray-900 font-bold">{totalPatients}</span>{" "}
          patients
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 rounded-lg border-gray-100 text-gray-600 font-semibold disabled:opacity-50"
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="h-9 rounded-lg border-gray-100 text-gray-600 font-semibold disabled:opacity-50"
            disabled={pageData?.last}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        patient={selectedPatient}
        isLoading={
          createPatientMutation.isPending || updatePatientMutation.isPending
        }
      />
    </div>
  );
}
