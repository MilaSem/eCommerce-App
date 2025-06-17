import { useState } from 'react';
import { Link } from 'react-router';
import { useCartStore } from '@/stores/cartStore';
import styles from './Navigation.module.css';

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const cart = useCartStore((state) => state.cart);
  const localCart = useCartStore((state) => state.localCart);

  const totalItems = cart
    ? cart.lineItems.reduce((sum, item) => sum + item.quantity, 0)
    : localCart.reduce((sum, item) => sum + item.quantity, 0);

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
            <img src="/assets/bee3.svg" alt="bee" width="50"></img>
          </Link>
        </li>
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
        <li>
          <Link className={styles.link} to="/cart" onClick={handleLinkClick}>
            <img
              src="/assets/cart-svgrepo-com1.svg"
              alt="cart"
              width="25"
            ></img>
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/profile" onClick={handleLinkClick}>
            <img
              src="/assets/user-svgrepo-com31.svg"
              alt="user"
              width="25"
            ></img>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
