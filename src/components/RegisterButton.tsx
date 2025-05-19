import { Button } from 'antd';
import { useNavigate } from 'react-router';

export const RegisterButton: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    void navigate('/register');
  };

  return <Button onClick={handleRegister}>Register</Button>;
};
