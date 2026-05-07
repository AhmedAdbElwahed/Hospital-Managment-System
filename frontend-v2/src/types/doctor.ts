export type Gender = "MALE" | "FEMALE";
export type BloodType = "A_POSITIVE" | "A_NEGATIVE" | "B_POSITIVE" | "B_NEGATIVE" | "AB_POSITIVE" | "AB_NEGATIVE" | "O_POSITIVE" | "O_NEGATIVE";
export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";

export interface RequiredInfoDto {
  firstname: string;
  lastname: string;
  gender: Gender;
  dob: string;
  address: string;
  phone: string;
  email: string;
  password?: string;
  is_enabled: boolean;
}

export interface AdditionalInfoDto {
  insurancePolicyNumber?: string;
  bloodType?: BloodType;
  maritalStatus?: MaritalStatus;
  nationality?: string;
}

export interface DoctorDto {
  requiredInfoDto: RequiredInfoDto;
  additionalInfoDto: AdditionalInfoDto;
  education?: string;
  certifications?: string;
  experience?: string;
  specialty?: string;
  licenseNumber?: string;
  workStartTime?: string;
  workEndTime?: string;
  activeStatus?: boolean;
}

export interface DoctorResponseDto {
  id: number;
  requiredInfoDto: RequiredInfoDto;
  additionalInfoDto: AdditionalInfoDto;
  education?: string;
  certifications?: string;
  experience?: string;
  specialty?: string;
  licenseNumber?: string;
  workStartTime?: string;
  workEndTime?: string;
  activeStatus?: boolean;
}

export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface DoctorFilters {
  education?: string;
  certifications?: string;
  experience?: string;
  activeStatus?: boolean;
  specialty?: string;
  licenseNumber?: string;
  workStartTime?: string;
  workEndTime?: string;
}

export interface PageDoctorResponseDto {
  totalElements: number;
  totalPages: number;
  size: number;
  content: DoctorResponseDto[];
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
