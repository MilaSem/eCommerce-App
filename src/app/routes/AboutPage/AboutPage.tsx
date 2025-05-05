import styles from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <div>
      <h2>Development Team</h2>
      <ul className={styles.container}>
        <li>
          <a href="https://github.com/milasem" target="blank">
            Mila Sem
          </a>
        </li>
        <li>
          <a href="https://github.com/hitman46923" target="blank">
            Anton Lenskey
          </a>
        </li>
        <li>
          <a href="Nadezhda Kozochkina" target="blank">
            Nadezhda Kozochkina
          </a>
        </li>
      </ul>
    </div>
  );
};
