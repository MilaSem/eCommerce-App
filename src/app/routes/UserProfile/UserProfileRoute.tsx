import { Navigate, useLocation } from 'react-router';
import { useCustomerStore } from '@/stores/customerStore';
import { ReactNode } from 'react';

interface UserProfileRouteProps {
  children: ReactNode;
}

export const UserProfileRoute: React.FC<UserProfileRouteProps> = ({
  children,
}) => {
  const { currentCustomer } = useCustomerStore();
  const location = useLocation();

  if (!currentCustomer) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
