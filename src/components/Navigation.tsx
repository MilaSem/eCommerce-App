import { Link } from 'react-router';
import styles from '../components/Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};
