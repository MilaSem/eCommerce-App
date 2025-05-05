import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { MainPage } from './routes/MainPage/MainPage';
import { AboutPage } from './routes/AboutPage/AboutPage';
import { Navigation } from '../components/Navigation';

export const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};
