import { model, models, Model, Document, Schema, Types } from "mongoose";
import { User as UserType } from "@/types/user";

export interface UserDoc extends Omit<UserType, "_id">, Document {
  _id: Types.ObjectId; // Mongoose _id type
}

const UserSchema = new Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  image: String,
  phone: String,
  streetAddress: String,
  postalCode: String,
  city: String,
  country: String,
  admin: { type: Boolean, default: false },
});

export const User =
  (models?.User as Model<UserDoc>) || model<UserDoc>("User", UserSchema);
