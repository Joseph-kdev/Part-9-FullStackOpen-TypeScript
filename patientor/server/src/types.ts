interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose["code"]>;
  }
  
  export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
  }
  
  export interface SickLeave {
    startDate: string;
    endDate: string;
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  
  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
  }
  
  export interface Discharge {
    date: string;
    criteria: string;
  }
  
  export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;
  
  export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }
  
  export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries?: Entry[];
  }
  
  export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }
  
  type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
  
  export type NonSsnPatient = Omit<Patient, "ssn" | "entries">;
  export type NewPatient = Omit<Patient, "id">;
  export type NewEntry = UnionOmit<Entry, "id">;