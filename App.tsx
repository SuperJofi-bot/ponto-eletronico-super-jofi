
import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabase';
import { User } from './types';
import Login from './pages/Login';
import DashboardLayout from './components/Layout/DashboardLayout';
import LoadingScreen from './components/UI/LoadingScreen';
import AccessDenied from './pages/AccessDenied';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '#dashboard');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUserData(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchUserData(session.user.id);
      else {
        setUserData(null);
        setLoading(false);
      }
    });

    const handleHashChange = () => setCurrentPath(window.location.hash || '#dashboard');
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Perfil não encontrado no banco. Ativando modo administrador temporário para teste.');
        setUserData({
          id: userId,
          nome: 'Gestor Demo',
          login: 'admin@demo.com',
          perfil: 'admin',
          ativo: true,
          criado_em: new Date().toISOString()
        });
      } else {
        setUserData(data);
      }
    } catch (err) {
      console.error('Erro crítico no perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (!session) return <Login />;
  if (userData && userData.perfil !== 'admin') return <AccessDenied />;

  return (
    <DashboardLayout 
      currentPath={currentPath} 
      userData={userData}
      onLogout={() => supabase.auth.signOut()}
    />
  );
};

export default App;
