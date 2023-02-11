import { Document } from "mongoose";

export interface Usuario extends Document{
  readonly email: string;
  phoneNumber: string;
  name: string;
  password: string;
  avatarUrl: string
}