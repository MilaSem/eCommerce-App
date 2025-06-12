import styles from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <div>
      <h2>Development Team</h2>
      <ul className={styles.container}>
        <li className={styles.mila}>
          <a
            className={styles.link}
            href="https://github.com/milasem"
            target="blank"
          >
            Mila Sem
          </a>
          <img
            className={styles.avatar}
            src="/src/assets/Mila.jpg"
            width="200"
            alt="Mila"
          ></img>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            pharetra a ligula vitae posuere. Nullam dignissim condimentum orci
            eu aliquet. Proin egestas nec nisi ut malesuada. Vivamus a nunc
            quam. Vestibulum id sodales mi. Donec ut tellus ac lacus aliquet
            laoreet. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Praesent vel neque ex. Pellentesque
            tortor lorem, dictum non luctus nec, tempus a lacus. Nunc dapibus
            venenatis mauris, et congue ex rhoncus pellentesque.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            pharetra a ligula vitae posuere. Nullam dignissim condimentum orci
            eu aliquet. Proin egestas nec nisi ut malesuada. Vivamus a nunc
            quam. Vestibulum id sodales mi. Donec ut tellus ac lacus aliquet
            laoreet. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Praesent vel neque ex. Pellentesque
            tortor lorem, dictum non luctus nec, tempus a lacus. Nunc dapibus
            venenatis mauris, et congue ex rhoncus pellentesque.
          </p>
        </li>
        <li className={styles.anton}>
          <a
            className={styles.link}
            href="https://github.com/hitman46923"
            target="blank"
          >
            Anton Lenskey
          </a>
          <img
            className={styles.avatar}
            src="/src/assets/Anton.jpg"
            alt="Anton"
          ></img>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            pharetra a ligula vitae posuere. Nullam dignissim condimentum orci
            eu aliquet. Proin egestas nec nisi ut malesuada. Vivamus a nunc
            quam. Vestibulum id sodales mi. Donec ut tellus ac lacus aliquet
            laoreet. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Praesent vel neque ex. Pellentesque
            tortor lorem, dictum non luctus nec, tempus a lacus. Nunc dapibus
            venenatis mauris, et congue ex rhoncus pellentesque.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            pharetra a ligula vitae posuere. Nullam dignissim condimentum orci
            eu aliquet. Proin egestas nec nisi ut malesuada. Vivamus a nunc
            quam. Vestibulum id sodales mi. Donec ut tellus ac lacus aliquet
            laoreet. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Praesent vel neque ex. Pellentesque
            tortor lorem, dictum non luctus nec, tempus a lacus. Nunc dapibus
            venenatis mauris, et congue ex rhoncus pellentesque.
          </p>
        </li>
        <li className={styles.nadya}>
          <a
            className={styles.link}
            href="https://github.com/kozochkina82"
            target="blank"
          >
            Nadezhda Kozochkina
          </a>
          <img
            className={styles.avatar}
            src="/src/assets/Nadya.jpg"
            alt="Nadya"
          ></img>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            pharetra a ligula vitae posuere. Nullam dignissim condimentum orci
            eu aliquet. Proin egestas nec nisi ut malesuada. Vivamus a nunc
            quam. Vestibulum id sodales mi. Donec ut tellus ac lacus aliquet
            laoreet. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Praesent vel neque ex. Pellentesque
            tortor lorem, dictum non luctus nec, tempus a lacus. Nunc dapibus
            venenatis mauris, et congue ex rhoncus pellentesque.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            pharetra a ligula vitae posuere. Nullam dignissim condimentum orci
            eu aliquet. Proin egestas nec nisi ut malesuada. Vivamus a nunc
            quam. Vestibulum id sodales mi. Donec ut tellus ac lacus aliquet
            laoreet. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Praesent vel neque ex. Pellentesque
            tortor lorem, dictum non luctus nec, tempus a lacus. Nunc dapibus
            venenatis mauris, et congue ex rhoncus pellentesque.
          </p>
        </li>
      </ul>
      <div className={styles.footer}>
        <div className={styles.footercontainer}>
          <a href="https://rs.school/" target="blank">
            <img
              src="/src/assets/rss-logo.c19ce1b4.svg"
              width="50"
              alt="rsschool logo"
            ></img>
          </a>
          <p>
            The website created for the Rolling Scopes School course
            «JavaScript/Frontend 2024Q4», stage 2, final project, June 2025.
          </p>
        </div>
      </div>
    </div>
  );
};
