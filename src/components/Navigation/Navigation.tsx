import { useState } from 'react';
import { Link } from 'react-router';
import styles from './Navigation.module.css';

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <button
        className={styles.menubutton}
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        {menuOpen ? '✖' : '☰'}
      </button>

      <ul className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
        <li>
          <Link className={styles.link} to="/" onClick={handleLinkClick}>
            Main
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/catalog" onClick={handleLinkClick}>
            Catalog
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/about" onClick={handleLinkClick}>
            About
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/cart" onClick={handleLinkClick}>
            Cart
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/profile" onClick={handleLinkClick}>
            Profile
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/login" onClick={handleLinkClick}>
            Login
          </Link>
        </li>
        <li>
          <Link
            className={styles.link}
            to="/register"
            onClick={handleLinkClick}
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};
