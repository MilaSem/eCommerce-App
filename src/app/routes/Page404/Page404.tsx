import { Link } from 'react-router';
import styles from './Page404.module.css';

export const Page404 = () => {
  return (
    <div className={styles.container}>
      <h1>Oops... Something went wrong!</h1>
      <p>
        Sorry, the page you requested was <b>not found</b>.
      </p>
      <img src="/bee_404.svg" className={styles.image} alt="page_404" />
      <Link to="/">to main page</Link>
    </div>
  );
};
