import mongoose from "mongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { clientPromise } from "./mongodbConnect";
import { User as UserModel } from "@/models/User";
import { User as UserType } from "@/types/user";

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials?: Record<"email" | "password", string>
      ): Promise<import("next-auth").User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const userDoc = await UserModel.findOne({ email: credentials.email })
          .lean()
          .exec();
        if (!userDoc) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          userDoc.password || ""
        );
        if (!isValid) return null;

        const { password, _id, ...rest } = userDoc;

        // Return an object matching NextAuth.User
        return {
          id: _id.toString(), // NextAuth requires `id`
          name: rest.name,
          email: rest.email,
          image: rest.image || null,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
};
