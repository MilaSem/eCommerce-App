import { RegisterForm } from '@/components/RegisterForm/RegisterForm';
import { Link } from 'react-router';
import styles from './RegisterPage.module.css';

export const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <h2>Register form</h2>
      <RegisterForm />
      <h2 className={styles.header}>Already registered?</h2>
      <Link to="/login">to login page</Link>
    </div>
  );
};
