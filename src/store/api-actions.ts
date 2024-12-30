import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../const';
import { ShortOfferListType } from '../types/types';
import {
  setAuthorizationStatus,
  setOffers,
  setOffersLoadingStatus,
} from './actions';
import { AuthorizationData, UserData } from '../types/user';
import { dropToken, setToken } from '../services/token';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>();

const uploadOffersAction = createAppAsyncThunk<void, undefined>(
  'offers/uploadOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const { data } = await api.get<ShortOfferListType>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(setOffers(data));
  }
);

const checkAuthorizationAction = createAppAsyncThunk<void, undefined>(
  'user/checkAuthorizationStatus',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

const loginAction = createAppAsyncThunk<void, AuthorizationData>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    setToken(token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAppAsyncThunk<void, undefined>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);

export { uploadOffersAction, checkAuthorizationAction, loginAction };
