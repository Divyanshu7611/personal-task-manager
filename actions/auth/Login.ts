"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/lib/dbConnect";
import { users } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function loginUser(email: string, password: string) {
  try {
    const JwtKey = process.env.JWT_SECRET || "Divyanshu";

    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length === 0) {
      return { error: "User Not Found, Please sign up" };
    }

    const user = existingUser[0];


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "Password Incorrect" };
    }


    const payload = { email: user.email, id: user.id };
    const token = jwt.sign(payload, JwtKey, { expiresIn: "2h" });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3 * 24 * 60 * 60, // 3 days
    });

    return { success: "Logged In Successfully", user,token};
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
}
