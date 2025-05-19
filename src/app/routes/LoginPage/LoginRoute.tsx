import { Navigate, useLocation } from 'react-router';
import { customerStore } from '@/stores/customerStore';
import { ReactNode } from 'react';

interface LoginRouteProps {
  children: ReactNode;
}

export const LoginRoute: React.FC<LoginRouteProps> = ({ children }) => {
  const { currentCustomer } = customerStore();
  const location = useLocation();

  if (currentCustomer) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};
