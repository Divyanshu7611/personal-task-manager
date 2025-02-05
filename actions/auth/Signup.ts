"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/dbConnect";
import { eq } from "drizzle-orm";
import { users } from "@/db/schemas";
import { error } from "console";

export async function registerUser(name: string, email: string, password: string) {
  try {
    // const existingUser = await db.select({ id: users.id,email:users.email }).from(users).where(eq(users.email, email)).limit(1);
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
        console.log("User already exists",existingUser);
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      age: 0,
      phone: "",
    });
    return { success: "User registered successfully" };
    
  } catch (error) {
    console.log("Error Creating user", error);
    return { error: "Error creating user" };
  }
}
