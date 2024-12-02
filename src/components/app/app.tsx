import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from '../../pages/main-page/main-page';
import FavoritePage from '../../pages/favorites-page/favorite-page';
import OfferPage from '../../pages/offer-page/offer-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AuthStatus, Path } from '../../const';
import { PrivateRoute } from '../private-route/private-route';
import { AuthStatusEnum } from '../../types/types';
import { ScrollToTop } from '../scroll-to-top/scroll-to-top';

type AppPageProps = {
  rentalOffersCount: number;
};

function App({ rentalOffersCount }: AppPageProps): JSX.Element {
  const isEmpty = false;
  const authStatus: AuthStatusEnum = AuthStatus.Auth;
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={Path.Root}
            element={
              <MainPage
                rentalOffersCount={rentalOffersCount}
                isLoggedIn={authStatus === AuthStatus.Auth}
                isEmpty={isEmpty}
              />
            }
          />
          <Route path={Path.Login} element={<LoginPage />} />
          <Route
            path={Path.Favorites}
            element={
              <PrivateRoute
                isLoggedIn={authStatus === AuthStatus.Auth}
                toPath={Path.Login}
              >
                <FavoritePage
                  isLoggedIn={authStatus === AuthStatus.Auth}
                  isEmpty={isEmpty}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={Path.Offer}
            element={<OfferPage isLoggedIn={authStatus === AuthStatus.Auth} />}
          />
          <Route path={Path.NotFound} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
