import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types';
import { Save, X } from 'lucide-react';

interface TaskFormProps {
  task?: Task;
  onSave: (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const TaskForm = ({ task, onSave, onCancel, loading = false }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending' as 'pending' | 'done',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  // Remplir le formulaire si on édite une tâche
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Save className="h-5 w-5" />
          <span>{task ? 'Modifier la tâche' : 'Nouvelle tâche'}</span>
        </CardTitle>
        <CardDescription>
          {task ? 'Modifiez les informations de votre tâche' : 'Créez une nouvelle tâche pour votre liste'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              type="text"
              placeholder="Entrez le titre de la tâche"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre tâche (optionnel)"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value: 'low' | 'medium' | 'high') => handleInputChange('priority', value)}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Haute</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'pending' | 'done') => handleInputChange('status', value)}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En cours</SelectItem>
                  <SelectItem value="done">Terminée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={loading}
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !formData.title.trim()}
              className="gradient-bg hover:opacity-90"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Sauvegarde...' : (task ? 'Modifier' : 'Créer')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;