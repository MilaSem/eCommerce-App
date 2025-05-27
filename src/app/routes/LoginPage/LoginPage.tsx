import { Link } from 'react-router';
import { AuthForm } from '@/components/AuthForm/AuthForm';
import styles from './loginPage.module.css';

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h2>Login form</h2>
      <AuthForm />
      <h2>Not registered yet?</h2>
      <Link to="/register">to register page</Link>
    </div>
  );
};
