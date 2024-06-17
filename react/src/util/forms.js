import {z} from 'zod';

export const loginFromSchema = z.object({
    email: z.string().email("Provide a proper email"),
    password: z.string().min(3, "password is not sufficient")
});

export const registerDoctorFormSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    gender: z.string(),
    is_enabled: z.string(),
    education: z.string(),
    certifications: z.string(),
    experience: z.string(),
    activeStatus: z.string(),
    specialty: z.string(),
    licenseNumber: z.string(),
    workStartTime: z.string(),
    workEndTime: z.string(),
})