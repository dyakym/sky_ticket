import { combineReducers } from 'redux';
import { favoritesReducer } from './favoritesReducer';
import { purchasedReducer } from './purchasedReducer';

export const rootReducer = combineReducers({
  favorites: favoritesReducer,
  purchased: purchasedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
