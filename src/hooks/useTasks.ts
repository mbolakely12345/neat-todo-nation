import { useState, useEffect } from 'react';
import { Task, TaskFilters } from '@/types';
import { useAuth } from './useAuth';

// Données mockées pour la démonstration
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Finaliser le design de l\'application',
    description: 'Créer les maquettes finales et valider l\'UX',
    status: 'pending',
    priority: 'high',
    userId: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Implémenter l\'authentification',
    description: 'Développer le système de login/signup',
    status: 'done',
    priority: 'high',
    userId: '1',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '3',
    title: 'Optimiser les performances',
    description: 'Analyser et améliorer les temps de chargement',
    status: 'pending',
    priority: 'medium',
    userId: '1',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  }
];

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  // Charger les tâches depuis le localStorage ou utiliser les données mockées
  useEffect(() => {
    if (user) {
      const savedTasks = localStorage.getItem('todoapp_tasks');
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks);
          setTasks(parsedTasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt)
          })));
        } catch (error) {
          console.error('Erreur lors du parsing des tâches:', error);
          setTasks(mockTasks);
        }
      } else {
        // Première visite, utiliser les données mockées
        setTasks(mockTasks);
        localStorage.setItem('todoapp_tasks', JSON.stringify(mockTasks));
      }
    }
  }, [user]);

  // Sauvegarder les tâches dans le localStorage
  const saveTasks = (newTasks: Task[]) => {
    localStorage.setItem('todoapp_tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  // Ajouter une nouvelle tâche
  const addTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    if (!user) return;
    
    setLoading(true);
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 500));

    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedTasks = [newTask, ...tasks];
    saveTasks(updatedTasks);
    setLoading(false);
  };

  // Mettre à jour une tâche
  const updateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
    setLoading(true);
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 300));

    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    );
    
    saveTasks(updatedTasks);
    setLoading(false);
  };

  // Supprimer une tâche
  const deleteTask = async (taskId: string): Promise<void> => {
    setLoading(true);
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 300));

    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
    setLoading(false);
  };

  // Filtrer les tâches
  const getFilteredTasks = (filters: TaskFilters) => {
    return tasks.filter(task => {
      if (filters.status && filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }
      if (filters.priority && filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return task.title.toLowerCase().includes(searchLower) ||
               task.description.toLowerCase().includes(searchLower);
      }
      return true;
    });
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    getFilteredTasks
  };
}