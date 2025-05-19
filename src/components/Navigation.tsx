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
          <Link to="/catalog">Catalog</Link>
        </li>
        <li>
          <Link to="/cart">Shopping Cart</Link>
        </li>
        <li>
          <Link to="/profile">Your Profile</Link>
        </li>
      </ul>
    </nav>
  );
};
