import { Profile } from '@/components/Profile/Profile';
import styles from './UserProfile.module.css';

export const UserProfile = () => {
  return (
    <div className={styles.container}>
      <h2>Your Profile</h2>
      <Profile />
    </div>
  );
};
