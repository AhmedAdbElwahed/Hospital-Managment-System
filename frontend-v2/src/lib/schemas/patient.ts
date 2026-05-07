import * as z from "zod";

export const patientSchema = z.object({
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  dob: z.string().min(1, "Date of birth is required"),
  address: z.string().min(5, "Address is required"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  insurancePolicyNumber: z.string().optional(),
  bloodType: z
    .enum([
      "A_POSITIVE",
      "A_NEGATIVE",
      "B_POSITIVE",
      "B_NEGATIVE",
      "AB_POSITIVE",
      "AB_NEGATIVE",
      "O_POSITIVE",
      "O_NEGATIVE",
    ])
    .optional(),
  maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]).optional(),
  nationality: z.string().optional(),
});

export type PatientFormValues = z.infer<typeof patientSchema>;

export const transformToPatientDto = (values: PatientFormValues) => {
  return {
    requiredInfoDto: {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      phone: values.phone,
      gender: values.gender,
      dob: values.dob,
      address: values.address,
      password: values.password,
    },
    additionalInfoDto: {
      insurancePolicyNumber: values.insurancePolicyNumber,
      bloodType: values.bloodType,
      maritalStatus: values.maritalStatus,
      nationality: values.nationality,
    },
  };
};
