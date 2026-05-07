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
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DoctorDto, 
  DoctorResponseDto 
} from "@/types/doctor";
import { doctorSchema, DoctorFormValues } from "@/lib/schemas/doctor";

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DoctorDto) => Promise<void>;
  doctor?: DoctorResponseDto | null;
  isLoading?: boolean;
}

export function DoctorModal({ isOpen, onClose, onSubmit, doctor, isLoading }: DoctorModalProps) {
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue,
    watch,
    formState: { errors } 
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      gender: "MALE",
    }
  });

  useEffect(() => {
    if (doctor) {
      reset({
        firstname: doctor.requiredInfoDto.firstname,
        lastname: doctor.requiredInfoDto.lastname,
        email: doctor.requiredInfoDto.email,
        phone: doctor.requiredInfoDto.phone,
        gender: doctor.requiredInfoDto.gender,
        dob: doctor.requiredInfoDto.dob,
        address: doctor.requiredInfoDto.address,
        specialty: doctor.specialty || "",
        education: doctor.education || "",
        experience: doctor.experience || "",
        licenseNumber: doctor.licenseNumber || "",
        workStartTime: doctor.workStartTime || "",
        workEndTime: doctor.workEndTime || ""
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
        specialty: "",
        education: "",
        experience: "",
        licenseNumber: "",
        workStartTime: "",
        workEndTime: "",
        password: ""
      });
    }
  }, [doctor, reset, isOpen]);

  const onFormSubmit = async (values: DoctorFormValues) => {
    const doctorDto: DoctorDto = {
      requiredInfoDto: {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        dob: values.dob,
        address: values.address,
        password: values.password,
        is_enabled: true
      },
      additionalInfoDto: {}, // Optional in my type def
      specialty: values.specialty,
      education: values.education,
      experience: values.experience,
      licenseNumber: values.licenseNumber,
      workStartTime: values.workStartTime,
      workEndTime: values.workEndTime,
      activeStatus: true
    };
    await onSubmit(doctorDto);
  };

  const selectedGender = watch("gender");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[620px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col max-h-[90vh]">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-50">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {doctor ? "Edit Doctor Details" : "Register New Doctor"}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              {doctor ? "Update the professional and contact information of the doctor." : "Fill in the required information to add a new medical professional."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname" className="font-bold text-gray-700">First Name</Label>
                <Input 
                  id="firstname" 
                  {...register("firstname")} 
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="John"
                />
                {errors.firstname && <p className="text-xs text-rose-500 font-medium">{errors.firstname.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname" className="font-bold text-gray-700">Last Name</Label>
                <Input 
                  id="lastname" 
                  {...register("lastname")} 
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="Doe"
                />
                {errors.lastname && <p className="text-xs text-rose-500 font-medium">{errors.lastname.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-gray-700">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  {...register("email")} 
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="john.doe@hospital.com"
                />
                {errors.email && <p className="text-xs text-rose-500 font-medium">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-bold text-gray-700">Phone Number</Label>
                <Input 
                  id="phone" 
                  {...register("phone")} 
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="text-xs text-rose-500 font-medium">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender" className="font-bold text-gray-700">Gender</Label>
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
                <Label htmlFor="dob" className="font-bold text-gray-700">Date of Birth</Label>
                <Input 
                  id="dob" 
                  type="date" 
                  {...register("dob")} 
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                />
                {errors.dob && <p className="text-xs text-rose-500 font-medium">{errors.dob.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="font-bold text-gray-700">Residential Address</Label>
              <Input 
                id="address" 
                {...register("address")} 
                className="rounded-xl border-gray-100 focus:ring-indigo-500"
                placeholder="123 Medical Way, Health City"
              />
              {errors.address && <p className="text-xs text-rose-500 font-medium">{errors.address.message}</p>}
            </div>

            <div className="border-t border-gray-50 my-2 pt-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Professional Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty" className="font-bold text-gray-700">Specialty</Label>
                  <Input 
                    id="specialty" 
                    {...register("specialty")} 
                    className="rounded-xl border-gray-100 focus:ring-indigo-500"
                    placeholder="Cardiology"
                  />
                  {errors.specialty && <p className="text-xs text-rose-500 font-medium">{errors.specialty.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber" className="font-bold text-gray-700">License Number</Label>
                  <Input 
                    id="licenseNumber" 
                    {...register("licenseNumber")} 
                    className="rounded-xl border-gray-100 focus:ring-indigo-500"
                    placeholder="LIC-12345678"
                  />
                  {errors.licenseNumber && <p className="text-xs text-rose-500 font-medium">{errors.licenseNumber.message}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education" className="font-bold text-gray-700">Education</Label>
                <Input 
                  id="education" 
                  {...register("education")} 
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="MD, PhD"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience" className="font-bold text-gray-700">Experience (Years)</Label>
                <Input 
                  id="experience" 
                  {...register("experience")} 
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                  placeholder="10"
                />
              </div>
            </div>

            {!doctor && (
              <div className="space-y-2">
                <Label htmlFor="password" className="font-bold text-gray-700">Account Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  {...register("password")} 
                  className="rounded-xl border-gray-100 focus:ring-indigo-500"
                />
                {errors.password && <p className="text-xs text-rose-500 font-medium">{errors.password.message}</p>}
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
              {isLoading ? "Saving..." : doctor ? "Update Doctor" : "Register Doctor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
