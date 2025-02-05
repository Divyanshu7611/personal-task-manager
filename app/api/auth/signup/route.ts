import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/dbConnect";
import { eq } from "drizzle-orm";
import { users } from "@/db/schemas";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  try {

    const existingUser = await db.select({id:users.id,email:users.email}).from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      age: 0,
      phone: "",
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}


