export type Gender = "MALE" | "FEMALE";

export type BloodType =
  | "A_POSITIVE"
  | "A_NEGATIVE"
  | "B_POSITIVE"
  | "B_NEGATIVE"
  | "AB_POSITIVE"
  | "AB_NEGATIVE"
  | "O_POSITIVE"
  | "O_NEGATIVE";

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
  is_enabled?: boolean;
}

export interface AdditionalInfoDto {
  insurancePolicyNumber?: string;
  bloodType?: BloodType;
  maritalStatus?: MaritalStatus;
  nationality?: string;
}

export interface PatientDto {
  requiredInfoDto: RequiredInfoDto;
  additionalInfoDto: AdditionalInfoDto;
}

export interface PatientResponseDto {
  id: number;
  requiredInfoDto: RequiredInfoDto;
  additionalInfoDto: AdditionalInfoDto;
  patientHistoryId?: number;
}

export interface PagePatientResponseDto {
  totalElements: number;
  totalPages: number;
  size: number;
  content: PatientResponseDto[];
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

export interface PatientHistoryDto {
  id?: number;
  hasPhysDiuresis?: boolean;
  hasPhysDiet?: boolean;
  hasPhysDrugs?: boolean;
  medicalConditions?: string;
  surgicalHistory?: string;
  allergies?: string;
  familyHistory?: string;
  socialHistory?: string;
}
