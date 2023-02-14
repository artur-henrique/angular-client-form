import { ThemePalette } from '@angular/material/core';

export interface Client {
  name: string;
  dob: Date; // Date of Birth
  phone: string;
  email: string;
  contact: Contact[];
  indicatedBy: string;
  plan: Plan;
  address: Address[];
  tags: string[]
}

export interface Address {
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  alias: string;
}

export enum Contact {
  ALL = 'all',
  SMS = 'sms',
  CALL = 'call',
  EMAIL = 'email'
}

export enum Plan {
  SIMPLE = 'simple',
  PREMIUM = 'premium'
}

export interface Task {
  name: string;
  value?: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
