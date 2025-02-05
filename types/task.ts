export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: Date;
  completed: boolean;
  projectId: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  color: string;
}