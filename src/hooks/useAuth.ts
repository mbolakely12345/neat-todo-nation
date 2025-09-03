import { useState, useEffect } from 'react';
import { User, AuthState } from '@/types';

// Hook pour gérer l'authentification avec données mockées
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler la vérification du token au démarrage
    const checkAuth = () => {
      const savedUser = localStorage.getItem('todoapp_user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isAuthenticated: true
          });
        } catch (error) {
          console.error('Erreur lors du parsing de l\'utilisateur:', error);
          localStorage.removeItem('todoapp_user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Fonction de connexion mockée
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validation simple pour la démonstration
    if (email && password.length >= 6) {
      const user: User = {
        id: '1',
        email,
        name: email.split('@')[0] || 'Utilisateur'
      };

      localStorage.setItem('todoapp_user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true
      });
      
      setLoading(false);
      return { success: true };
    }

    setLoading(false);
    return { success: false, error: 'Email ou mot de passe incorrect' };
  };

  // Fonction d'inscription mockée
  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validation simple
    if (name && email && password.length >= 6) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name
      };

      localStorage.setItem('todoapp_user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true
      });
      
      setLoading(false);
      return { success: true };
    }

    setLoading(false);
    return { success: false, error: 'Veuillez remplir tous les champs correctement' };
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('todoapp_user');
    localStorage.removeItem('todoapp_tasks');
    setAuthState({
      user: null,
      isAuthenticated: false
    });
  };

  return {
    ...authState,
    login,
    signup,
    logout,
    loading
  };
}