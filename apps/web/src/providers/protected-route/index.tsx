import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../services/auth';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  function handleVerifyToken() {
    if (!user.token) {
      navigate('/login', { replace: true });
    }
  }

  useEffect(handleVerifyToken, [navigate, user.token]);

  return children;
}
