import { BrowserRouter as Router, Routes, Route } from 'react-router';

import { Navigation } from '@/components/Navigation/Navigation';

import { MainPage } from './routes/MainPage/MainPage';
import { CatalogPage } from './routes/CatalogPage/CatalogPage';
import { AboutPage } from './routes/AboutPage/AboutPage';
import { CartPage } from './routes/СartPage/CartPage';
import { UserProfile } from './routes/UserProfile/UserProfile';
import { LoginPage } from './routes/LoginPage/LoginPage';
import { LoginRoute } from './routes/LoginPage/LoginRoute';
import { RegisterPage } from './routes/RegisterPage/RegisterPage';
import { Page404 } from './routes/Page404/Page404';
import { ProductDetails } from '@/components/ProductDetails/ProductDetails';
import { UserProfileRoute } from './routes/UserProfile/UserProfileRoute';

export const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/profile"
          element={
            <UserProfileRoute>
              <UserProfile />
            </UserProfileRoute>
          }
        />

        <Route
          path="/login"
          element={
            <LoginRoute>
              <LoginPage />
            </LoginRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/catalog/:productId" element={<ProductDetails />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};
