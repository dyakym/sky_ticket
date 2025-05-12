import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  TOGGLE_FAVORITE,
  ADD_PURCHASED,
  REMOVE_PURCHASED,
  CLEAR_PURCHASED,
} from "../types/actionTypes";
import type { PurchasedTicket } from "../types/PurchasedTicket";

// Favorites actions
export const addFavorite = (id: string) => ({
  type: ADD_FAVORITE,
  payload: id,
});

export const removeFavorite = (id: string) => ({
  type: REMOVE_FAVORITE,
  payload: id,
});

export const toggleFavorite = (id: string) => ({
  type: TOGGLE_FAVORITE,
  payload: id,
});

// Cart actions
export const addPurchased = (ticket: PurchasedTicket) => ({
  type: ADD_PURCHASED,
  payload: ticket,
});

export const removePurchased = (flightId: string, seatId: string) => ({
  type: REMOVE_PURCHASED,
  payload: { flightId, seatId },
});

export const clearPurchased = () => ({
  type: CLEAR_PURCHASED,
});