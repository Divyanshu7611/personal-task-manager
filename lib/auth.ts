import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./dbConnect"; 
import { users } from "@/db/schemas"; 
import { eq } from "drizzle-orm";

type Credentials = {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  createdAt: Date;
};

type UserType = {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  createdAt: Date;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "abc@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; 
        }

        const user = await db.query.users.findFirst({
            where: eq(users.email,credentials.email),
          });

        if (!user) {
          throw new Error("User not found");
        }

        // Compare the password
        const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }


        return {
          id: user.id.toString(),
          email: user.email,
          password: user.password,
          name: user.name,
          phone: user.phone,
          createdAt: user.createdAt,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
