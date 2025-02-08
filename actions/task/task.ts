'use server'

import { db } from '@/lib/dbConnect'
import { tasks } from '@/db/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.date(),
  completed: z.boolean().optional().default(false),
  projectId: z.string().uuid(),
  userId: z.string().uuid()
})

export async function createTask(data: z.infer<typeof TaskSchema>) {
  const validatedData = TaskSchema.parse(data)
  
  try {
    const [newTask] = await db
      .insert(tasks)
      .values(validatedData)
      .returning()
    
    return { success: true, task: newTask }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function updateTask(id: string, data: Partial<z.infer<typeof TaskSchema>>) {
  try {
    const [updatedTask] = await db
      .update(tasks)
      .set(data)
      .where(eq(tasks.id, id))
      .returning()
    
    return { success: true, task: updatedTask }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function deleteTask(id: string) {
  try {
    await db.delete(tasks).where(eq(tasks.id, id))
    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function getTasksByUser(userId: string) {
  try {
    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId))
    
    return { success: true, tasks: userTasks }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function getTasksByProject(projectId: string) {
  try {
    const projectTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, projectId))
    
    return { success: true, tasks: projectTasks }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}