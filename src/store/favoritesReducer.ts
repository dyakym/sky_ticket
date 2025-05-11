import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from "../types/actionTypes";

const loadFavorites = (): string[] => {
  try {
    const serialized = localStorage.getItem("favorites");
    if (!serialized) return [];
    return JSON.parse(serialized);
  } catch {
    return [];
  }
};

const saveFavorites = (items: string[]) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(items));
  } catch {}
};

interface FavoritesState {
  items: string[];
}

const initialState: FavoritesState = {
  items: loadFavorites(),
};

type FavoritesAction =
  | { type: typeof ADD_FAVORITE; payload: string }
  | { type: typeof REMOVE_FAVORITE; payload: string };

export const favoritesReducer = (
  state = initialState,
  action: FavoritesAction
): FavoritesState => {
  switch (action.type) {
    case ADD_FAVORITE:
      if (state.items.includes(action.payload)) return state;
      const added = [...state.items, action.payload];
      saveFavorites(added);
      return { items: added };
    case REMOVE_FAVORITE:
      const removed = state.items.filter((id) => id !== action.payload);
      saveFavorites(removed);
      return { items: removed };
    default:
      return state;
  }
};
