"use server";
import { db } from "@/lib/dbConnect";
import { tasks } from "@/db/schemas";
import { NextRequest, NextResponse } from "next/server";

// Get All Tasks
export async function GET(req: NextRequest) {
    const allTasks = await db.query.tasks.findMany();
    return NextResponse.json(allTasks);
}

// Create Task
export async function POST(req: NextRequest) {
    const { title, description, projectId } = await req.json();
    const newTask = await db.insert(tasks).values({ title, description, projectId });
    return NextResponse.json(newTask);
}

// Delete Task
export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    await db.delete(tasks).where({ id });
    return NextResponse.json({ message: "Task deleted" });
}
