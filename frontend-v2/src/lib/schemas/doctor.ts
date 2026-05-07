import * as z from "zod";

export const doctorSchema = z.object({
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  dob: z.string().min(1, "Date of birth is required"),
  address: z.string().min(5, "Address is required"),
  specialty: z.string().min(2, "Specialty is required"),
  education: z.string().optional(),
  experience: z.string().optional(),
  licenseNumber: z.string().min(2, "License number is required"),
  workStartTime: z.string().optional(),
  workEndTime: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

export type DoctorFormValues = z.infer<typeof doctorSchema>;
