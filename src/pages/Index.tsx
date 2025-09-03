import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, LogIn, UserPlus, Target, Clock, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <CheckSquare className="h-12 w-12 text-primary" />
              <h1 className="text-5xl font-bold gradient-bg bg-clip-text text-transparent">
                TodoApp
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Organisez votre vie avec élégance
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une application de gestion de tâches moderne et intuitive pour vous aider à rester productif et organisé
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <Link to="/login">
              <Button size="lg" className="gradient-bg hover:opacity-90 transition-all duration-200 text-lg px-8">
                <LogIn className="mr-2 h-5 w-5" />
                Se connecter
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="text-lg px-8 hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                <UserPlus className="mr-2 h-5 w-5" />
                Créer un compte
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Fonctionnalités principales</h3>
          <p className="text-muted-foreground">Tout ce dont vous avez besoin pour gérer vos tâches efficacement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="card-hover gradient-card text-center">
            <CardHeader>
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Gestion complète</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Créez, modifiez et supprimez vos tâches avec une interface intuitive et moderne
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-hover gradient-card text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Filtrage avancé</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Filtrez par statut, priorité et recherchez dans vos tâches pour une organisation optimale
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-hover gradient-card text-center">
            <CardHeader>
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Priorités visuelles</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Définissez des niveaux de priorité avec un système de couleurs clair et intuitif
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center gradient-card">
          <CardHeader>
            <CardTitle className="text-2xl">Prêt à commencer ?</CardTitle>
            <CardDescription>
              Rejoignez des milliers d'utilisateurs qui organisent leur vie avec TodoApp
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="gradient-bg hover:opacity-90 transition-all duration-200">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Créer mon compte gratuitement
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              Gratuit • Sans engagement • Interface moderne
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <CheckSquare className="h-6 w-6 text-primary" />
              <span className="font-semibold">TodoApp</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Une application de gestion de tâches moderne et élégante
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
