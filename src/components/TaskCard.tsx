import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types';
import { CalendarDays, Edit2, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: 'pending' | 'done') => void;
}

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusToggle = async () => {
    setIsLoading(true);
    const newStatus = task.status === 'pending' ? 'done' : 'pending';
    await onStatusChange(task.id, newStatus);
    setIsLoading(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'priority-badge-high';
      case 'medium':
        return 'priority-badge-medium';
      case 'low':
        return 'priority-badge-low';
      default:
        return 'priority-badge-low';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'done' ? 'status-badge-done' : 'status-badge-pending';
  };

  return (
    <Card className={cn(
      "card-hover transition-all duration-200",
      task.status === 'done' && "opacity-75"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStatusToggle}
              disabled={isLoading}
              className="p-0 h-auto hover:bg-transparent"
            >
              {task.status === 'done' ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              )}
            </Button>
            <CardTitle className={cn(
              "text-lg leading-tight",
              task.status === 'done' && "line-through text-muted-foreground"
            )}>
              {task.title}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className={cn(
          "text-sm text-muted-foreground",
          task.status === 'done' && "line-through"
        )}>
          {task.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge 
              variant="outline" 
              className={getPriorityColor(task.priority)}
            >
              {task.priority === 'high' ? 'Haute' : 
               task.priority === 'medium' ? 'Moyenne' : 'Faible'}
            </Badge>
            <Badge 
              variant="outline" 
              className={getStatusColor(task.status)}
            >
              {task.status === 'done' ? 'Terminée' : 'En cours'}
            </Badge>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="h-3 w-3 mr-1" />
            {task.createdAt.toLocaleDateString('fr-FR')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;