import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/libs/mongodbConnect";

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "test@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          
          const email = credentials?.email
          const password = credentials?.password
          
          mongoose.connect(process.env.DATABASE_ACCESS)
  
          const user = await User.findOne({email})
  
          const passwordOk = user && bcrypt.compareSync(password, user.password)
      
          if (passwordOk) {
            
            return user
          }
  
          return null;
        },
      }),
    ],
  };
