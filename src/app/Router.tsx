import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { MainPage } from './routes/MainPage/MainPage';
import { AboutPage } from './routes/AboutPage/AboutPage';
import { Navigation } from '../components/Navigation';
import { LoginPage } from './routes/LoginPage/LoginPage';
import { LoginRoute } from './routes/LoginPage/LoginRoute';
import { RegisterPage } from './routes/RegisterPage/RegisterPage';

export const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/login"
          element={
            <LoginRoute>
              <LoginPage />
            </LoginRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};
