import { Link } from 'react-router';
import styles from './Page404.module.css';

export const Page404 = () => {
  return (
    <div className={styles.container}>
      <h1>Oops... Something went wrong!</h1>
      <p>
        Sorry, the page you requested was <b>not found</b>.
      </p>
      <img src="./src/assets/bee_404.svg" width="800" alt="page_404"></img>
      <Link to="/">Return to main page</Link>
    </div>
  );
};
