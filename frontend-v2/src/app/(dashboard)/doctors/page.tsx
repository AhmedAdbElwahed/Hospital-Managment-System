"use client";

import { useState, useEffect } from "react";
import { useDoctors, useDeleteDoctor, useRegisterDoctor, useUpdateDoctor, useSearchDoctors } from "@/hooks/useDoctors";
import { useDebounce } from "@/hooks/use-debounce";
import { DoctorsTable } from "@/components/doctors/DoctorsTable";
import { DoctorModal } from "@/components/doctors/DoctorModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, UserRound, ArrowUpDown, X } from "lucide-react";
import { DoctorDto, DoctorResponseDto, Pageable, DoctorFilters } from "@/types/doctor";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

export default function DoctorsPage() {
  const [pageable, setPageable] = useState<Pageable>({ page: 0, size: 10, sort: ["id,desc"] });
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<DoctorFilters>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorResponseDto | null>(null);
  
  const debouncedSearch = useDebounce(searchTerm, 500);
  const isSearching = debouncedSearch.length > 0;

  // Reset page to 0 when search or filters change
  useEffect(() => {
    setPageable(prev => ({ ...prev, page: 0 }));
  }, [debouncedSearch, filters]);

  const { data: listData, isLoading: isListLoading } = useDoctors(pageable, filters, { enabled: !isSearching });
  const { data: searchData, isLoading: isSearchLoading } = useSearchDoctors(debouncedSearch, pageable, { enabled: isSearching });

  const pageData = isSearching ? searchData : listData;
  const isLoading = isSearching ? isSearchLoading : isListLoading;

  const deleteDoctorMutation = useDeleteDoctor();
  const registerDoctorMutation = useRegisterDoctor();
  const updateDoctorMutation = useUpdateDoctor(selectedDoctor?.id || 0);

  const handleEdit = (doctor: DoctorResponseDto) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this doctor?")) {
      await deleteDoctorMutation.mutateAsync(id);
    }
  };

  const handleAddNew = () => {
    setSelectedDoctor(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data: DoctorDto) => {
    try {
      if (selectedDoctor) {
        await updateDoctorMutation.mutateAsync(data);
      } else {
        await registerDoctorMutation.mutateAsync(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save doctor:", error);
    }
  };

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setPageable(prev => ({
      ...prev,
      sort: [`${field},${direction}`]
    }));
  };

  const applyFilters = (newFilters: DoctorFilters) => {
    setFilters(newFilters);
    setIsFilterSheetOpen(false);
  };

  const clearFilters = () => {
    setFilters({});
    setIsFilterSheetOpen(false);
  };

  const doctors = pageData?.content || [];
  const offset = pageData?.pageable?.offset || 0 ;
  const totalDoctors = pageData?.totalElements || 0;
  const activeFiltersCount = Object.values(filters).filter(v => v !== undefined && v !== "" && v !== null).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Doctors Directory</h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">Manage and monitor all medical staff in the system.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleAddNew}
            className="h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 font-semibold gap-2 px-5"
          >
            <Plus className="h-5 w-5" />
            Add New Doctor
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-indigo-50 p-3 rounded-xl">
            <UserRound className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Doctors</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalDoctors}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by name, specialty or license..." 
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
        <div className="flex items-center gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" className="h-11 rounded-xl border-gray-100 text-gray-600 font-semibold gap-2 flex-1 md:flex-none">
                  <ArrowUpDown className="h-4 w-4" />
                  Sort By
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-48 rounded-xl border-gray-100 shadow-xl p-1">
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => handleSort("firstname", "asc")}
                >
                  Name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => handleSort("firstname", "desc")}
                >
                  Name (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => handleSort("specialty", "asc")}
                >
                  Specialty
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => handleSort("experience", "desc")}
                >
                  Experience
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => handleSort("id", "desc")}
                >
                  Newest First
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" className="h-11 rounded-xl border-gray-100 text-gray-600 font-semibold gap-2 flex-1 md:flex-none relative">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              }
            />
            <SheetContent className="w-[400px] sm:w-[540px] p-0 flex flex-col">
              <SheetHeader className="p-6 border-b border-gray-50">
                <SheetTitle className="text-xl font-bold">Filter Doctors</SheetTitle>
                <SheetDescription>
                  Refine the doctor list using specific criteria.
                </SheetDescription>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700">Specialty</Label>
                    <Input 
                      placeholder="e.g. Cardiology" 
                      value={filters.specialty || ""} 
                      onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
                      className="rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700">License Number</Label>
                    <Input 
                      placeholder="e.g. LIC-123" 
                      value={filters.licenseNumber || ""} 
                      onChange={(e) => setFilters(prev => ({ ...prev, licenseNumber: e.target.value }))}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700">Education</Label>
                    <Input 
                      placeholder="e.g. MD" 
                      value={filters.education || ""} 
                      onChange={(e) => setFilters(prev => ({ ...prev, education: e.target.value }))}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700">Status</Label>
                    <select
                      className="flex h-10 w-full rounded-xl border border-gray-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={filters.activeStatus === undefined ? "" : filters.activeStatus.toString()}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFilters(prev => ({ 
                          ...prev, 
                          activeStatus: val === "" ? undefined : val === "true" 
                        }));
                      }}
                    >
                      <option value="">All Statuses</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <SheetFooter className="p-6 border-t border-gray-50 bg-gray-50/50 flex flex-row gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-xl h-11 font-bold border-gray-200"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <SheetClose render={
                  <Button 
                    className="flex-1 rounded-xl h-11 font-bold bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => applyFilters(filters)}
                  >
                    Apply Filters
                  </Button>
                } />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <DoctorsTable 
        doctors={doctors} 
        isLoading={isLoading} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-bold">{offset + doctors.length}</span> of <span className="text-gray-900 font-bold">{totalDoctors}</span> doctors
        </p>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="h-9 rounded-lg border-gray-100 text-gray-600 font-semibold disabled:opacity-50"
            disabled={pageable.page === 0}
            onClick={() => setPageable(prev => ({ ...prev, page: prev.page - 1 }))}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            className="h-9 rounded-lg border-gray-100 text-gray-600 font-semibold disabled:opacity-50"
            disabled={pageData?.last}
            onClick={() => setPageable(prev => ({ ...prev, page: prev.page + 1 }))}
          >
            Next
          </Button>
        </div>
      </div>

      <DoctorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        doctor={selectedDoctor}
        isLoading={registerDoctorMutation.isPending || updateDoctorMutation.isPending}
      />
    </div>
  );
}
