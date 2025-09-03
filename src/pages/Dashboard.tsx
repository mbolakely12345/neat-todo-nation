import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { useToast } from '@/hooks/use-toast';
import { Task, TaskFilters as TaskFiltersType } from '@/types';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import TaskFilters from '@/components/TaskFilters';
import { 
  CheckSquare, 
  Plus, 
  LogOut, 
  User, 
  Calendar, 
  Target, 
  TrendingUp,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, addTask, updateTask, deleteTask, getFilteredTasks } = useTasks();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filters, setFilters] = useState<TaskFiltersType>({});

  const filteredTasks = getFilteredTasks(filters);
  
  // Statistiques
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'done').length,
    pending: tasks.filter(task => task.status === 'pending').length,
    highPriority: tasks.filter(task => task.priority === 'high' && task.status === 'pending').length
  };

  const handleSaveTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        toast({
          title: "Tâche modifiée",
          description: "Votre tâche a été mise à jour avec succès",
        });
      } else {
        await addTask(taskData);
        toast({
          title: "Tâche créée",
          description: "Votre nouvelle tâche a été ajoutée",
        });
      }
      setShowForm(false);
      setEditingTask(undefined);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la tâche",
        variant: "destructive",
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast({
        title: "Tâche supprimée",
        description: "La tâche a été supprimée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la tâche",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (taskId: string, status: 'pending' | 'done') => {
    try {
      await updateTask(taskId, { status });
      toast({
        title: status === 'done' ? "Tâche terminée !" : "Tâche réactivée",
        description: status === 'done' ? "Félicitations ! 🎉" : "Tâche remise en cours",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut",
        variant: "destructive",
      });
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckSquare className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">
                  TodoApp
                </h1>
                <p className="text-sm text-muted-foreground">
                  Bienvenue, {user?.name} !
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => setShowForm(true)}
                className="gradient-bg hover:opacity-90"
                disabled={showForm}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle tâche
              </Button>
              <Button 
                variant="outline"
                onClick={handleLogout}
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Terminées</p>
                  <p className="text-2xl font-bold text-success">{stats.completed}</p>
                </div>
                <CheckSquare className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En cours</p>
                  <p className="text-2xl font-bold text-pending">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-pending" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Priorité haute</p>
                  <p className="text-2xl font-bold text-destructive">{stats.highPriority}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formulaire de création/édition */}
        {showForm && (
          <div className="mb-8 animate-fade-in">
            <TaskForm
              task={editingTask}
              onSave={handleSaveTask}
              onCancel={handleCancelForm}
              loading={loading}
            />
          </div>
        )}

        {/* Filtres */}
        <TaskFilters 
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Liste des tâches */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="space-y-4">
                  <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {tasks.length === 0 ? 'Aucune tâche pour le moment' : 'Aucun résultat'}
                    </h3>
                    <p className="text-muted-foreground">
                      {tasks.length === 0 
                        ? 'Créez votre première tâche pour commencer à organiser votre travail'
                        : 'Essayez de modifier vos filtres pour voir plus de tâches'
                      }
                    </p>
                  </div>
                  {tasks.length === 0 && (
                    <Button 
                      onClick={() => setShowForm(true)}
                      className="gradient-bg hover:opacity-90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Créer ma première tâche
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredTasks.map((task, index) => (
                <div key={task.id} className="animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <TaskCard
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;