import { useAuth } from '../hooks/useAuth';
import { Redirect } from 'expo-router';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}
