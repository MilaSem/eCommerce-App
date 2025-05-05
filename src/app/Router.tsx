import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { MainPage } from './routes/MainPage';
import { AboutPage } from './routes/AboutPage';
import { Navigation, Navigation2 } from '../components/Navigation';

export const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Navigation2 />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};
