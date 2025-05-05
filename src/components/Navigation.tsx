import { Menu, ConfigProvider } from 'antd';
import { Link } from 'react-router';
import styles from '../components/Navigation.module.css';

export const Navigation = () => {
  const items = [
    {
      key: 'main',
      label: <Link to="/">Main</Link>,
    },
    {
      key: 'about',
      label: <Link to="/about">About</Link>,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#60a81b',
          borderRadius: 5,
          colorBgContainer: '#f6ffed',
        },
      }}
    >
      <Menu mode="horizontal" items={items} />
    </ConfigProvider>
  );
};

export const Navigation2 = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
      </ul>
    </nav>
  );
};
