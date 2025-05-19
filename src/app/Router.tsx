import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { MainPage } from './routes/MainPage/MainPage';
import { AboutPage } from './routes/AboutPage/AboutPage';
import { CatalogPage } from './routes/CatalogPage/CatalogPage';
import { Navigation } from '../components/Navigation';

/*import { LoginPage } from './routes/LoginPage/LoginPage';
import { LoginRoute } from './routes/LoginPage/LoginRoute';
import { RegisterPage } from './routes/RegisterPage/RegisterPage';
*/

import { Page404 } from './routes/Page404/Page404';
import { CartPage } from './routes/СartPage/CartPage';
import { RegisterPage } from './routes/RegisterPage/RegisterPage';
import { UserProfile } from './routes/UserProfile/UserProfile';

export const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        
        /*
        <Route
          path="/login"
          element={
            <LoginRoute>
              <LoginPage />
            </LoginRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        */

        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/page404" element={<Page404 />} />

      </Routes>
    </Router>
  );
};
