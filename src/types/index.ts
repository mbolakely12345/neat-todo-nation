// Types TypeScript pour l'application Todo

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'done';
  priority: 'low' | 'medium' | 'high';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface TaskFilters {
  status?: 'all' | 'pending' | 'done';
  priority?: 'all' | 'low' | 'medium' | 'high';
  search?: string;
}