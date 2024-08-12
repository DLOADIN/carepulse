import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  userid: string;
  name: string;
  email: string;
  phone: string;
  birthDay: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  InsuranceProvider: string;
  InsurancePolicyNumber: string;
  alergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  passMedicalHistory: string | undefined;
  IdenticationType: string | undefined;
  IdentificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}