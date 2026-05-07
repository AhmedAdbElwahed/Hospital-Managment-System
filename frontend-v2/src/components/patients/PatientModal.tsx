"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PatientDto, PatientResponseDto } from "@/types/patient";
import {
  patientSchema,
  PatientFormValues,
  transformToPatientDto,
} from "@/lib/schemas/patient";

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PatientDto) => Promise<void>;
  patient?: PatientResponseDto | null;
  isLoading?: boolean;
}

export function PatientModal({
  isOpen,
  onClose,
  onSubmit,
  patient,
  isLoading,
}: PatientModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      gender: "MALE",
    },
  });

  useEffect(() => {
    if (patient) {
      reset({
        firstname: patient.requiredInfoDto.firstname,
        lastname: patient.requiredInfoDto.lastname,
        email: patient.requiredInfoDto.email,
        phone: patient.requiredInfoDto.phone,
        gender: patient.requiredInfoDto.gender,
        dob: patient.requiredInfoDto.dob,
        address: patient.requiredInfoDto.address,
        insurancePolicyNumber: patient.additionalInfoDto.insurancePolicyNumber || "",
        bloodType: patient.additionalInfoDto.bloodType,
        maritalStatus: patient.additionalInfoDto.maritalStatus,
        nationality: patient.additionalInfoDto.nationality || "",
      });
    } else {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        gender: "MALE",
        dob: "",
        address: "",
        password: "",
        insurancePolicyNumber: "",
        nationality: "",
      });
    }
  }, [patient, reset, isOpen]);

  const onFormSubmit = async (values: PatientFormValues) => {
    const patientDto = transformToPatientDto(values);
    await onSubmit(patientDto as PatientDto);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[620px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col max-h-[90vh]"
        >
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-50">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {patient ? "Edit Patient Details" : "Register New Patient"}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              {patient
                ? "Update the personal and medical information of the patient."
                : "Fill in the required information to add a new patient to the system."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname" className="font-bold text-gray-700">
                  First Name
                </Label>
                <Input
                  id="firstname"
                  {...register("firstname")}
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="John"
                />
                {errors.firstname && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname" className="font-bold text-gray-700">
                  Last Name
                </Label>
                <Input
                  id="lastname"
                  {...register("lastname")}
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="Doe"
                />
                {errors.lastname && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-bold text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender" className="font-bold text-gray-700">
                  Gender
                </Label>
                <select
                  id="gender"
                  className="flex h-10 w-full rounded-xl border border-gray-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("gender")}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob" className="font-bold text-gray-700">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  type="date"
                  {...register("dob")}
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                />
                {errors.dob && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errors.dob.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="font-bold text-gray-700">
                Residential Address
              </Label>
              <Input
                id="address"
                {...register("address")}
                className="rounded-xl border-gray-100 focus:ring-indigo-500"
                placeholder="123 Health St, Wellness City"
              />
              {errors.address && (
                <p className="text-xs text-rose-500 font-medium">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="border-t border-gray-50 my-2 pt-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                Additional Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="bloodType"
                    className="font-bold text-gray-700"
                  >
                    Blood Type
                  </Label>
                  <select
                    id="bloodType"
                    className="flex h-10 w-full rounded-xl border border-gray-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    {...register("bloodType")}
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A_POSITIVE">A+</option>
                    <option value="A_NEGATIVE">A-</option>
                    <option value="B_POSITIVE">B+</option>
                    <option value="B_NEGATIVE">B-</option>
                    <option value="AB_POSITIVE">AB+</option>
                    <option value="AB_NEGATIVE">AB-</option>
                    <option value="O_POSITIVE">O+</option>
                    <option value="O_NEGATIVE">O-</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="maritalStatus"
                    className="font-bold text-gray-700"
                  >
                    Marital Status
                  </Label>
                  <select
                    id="maritalStatus"
                    className="flex h-10 w-full rounded-xl border border-gray-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    {...register("maritalStatus")}
                  >
                    <option value="">Select Status</option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="WIDOWED">Widowed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="insurancePolicyNumber"
                  className="font-bold text-gray-700"
                >
                  Insurance Policy #
                </Label>
                <Input
                  id="insurancePolicyNumber"
                  {...register("insurancePolicyNumber")}
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="POL-992031"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality" className="font-bold text-gray-700">
                  Nationality
                </Label>
                <Input
                  id="nationality"
                  {...register("nationality")}
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="American"
                />
              </div>
            </div>

            {!patient && (
              <div className="space-y-2">
                <Label htmlFor="password" className="font-bold text-gray-700">
                  Account Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                />
                {errors.password && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="m-0 p-6 bg-gray-50/50 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl h-11 border-gray-100 text-gray-600 font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl h-11 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 font-semibold px-8"
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : patient
                ? "Update Patient"
                : "Register Patient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
