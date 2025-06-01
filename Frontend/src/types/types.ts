import type { ChangeEvent } from "react";

export type filterHandler =
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLInputElement>;

export interface Iuser extends Document {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  gender: string;
  address?: string;
  mobileNumber?: number;
  pincode?: string;
  country?: string;
  state?: string;
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  age: number;
}
