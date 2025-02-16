import { store } from '../store';
import { CityKeys } from './cities';
import { FavoritesListType } from './favorites';
import { OfferType } from './offer';
import { ShortOfferListType } from './offers';
import { PageKeys } from './page';
import { ReviewsListType } from './review';
import { SortTypeKeys } from './sort';
import { AuthorizationStatusKeys, UserInfo } from './user';

type InitialState = {
  currentCity: CityKeys;
  currentSortKey: SortTypeKeys;
  offers: ShortOfferListType;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatusKeys;
  userInfo: UserInfo | null;
  isAuthRequestExecuted: boolean;
  extendedOffer: OfferType | null;
  isExtendedOfferLoading: boolean;
  nearbyOffers: ShortOfferListType;
  isNearbyOffersLoading: boolean;
  reviewsList: ReviewsListType;
  isReviewsListLoading: boolean;
  isSubmitReviewLoading: boolean;
  favorites: FavoritesListType;
  isFavoritesLoading: boolean;
  isChangingStaus: boolean;
  error: string | null;
  currentPage: PageKeys;
};

type State = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type { InitialState, State, AppDispatch };
