import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { TaskFilters as TaskFiltersType } from '@/types';
import { Search, Filter } from 'lucide-react';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
}

const TaskFilters = ({ filters, onFiltersChange }: TaskFiltersProps) => {
  const handleFilterChange = (key: keyof TaskFiltersType, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? undefined : value
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher dans vos tâches..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select 
                value={filters.status || 'all'} 
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger className="w-32 transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="pending">En cours</SelectItem>
                  <SelectItem value="done">Terminées</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select 
              value={filters.priority || 'all'} 
              onValueChange={(value) => handleFilterChange('priority', value)}
            >
              <SelectTrigger className="w-32 transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="high">Haute</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskFilters;