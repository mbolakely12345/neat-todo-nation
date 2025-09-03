import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { CheckSquare, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "Connexion réussie !",
        description: "Bienvenue dans votre espace Todo",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Erreur de connexion",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-primary/10 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CheckSquare className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">TodoApp</h1>
            </div>
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>
              Connectez-vous à votre compte pour accéder à vos tâches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full gradient-bg hover:opacity-90 transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Vous n'avez pas de compte ?{' '}
                <Link 
                  to="/signup" 
                  className="text-primary hover:text-primary-muted font-medium transition-colors duration-200"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
            
            {/* Informations de démonstration */}
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Demo:</strong> Utilisez n'importe quel email et un mot de passe d'au moins 6 caractères
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;