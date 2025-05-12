import {
  ADD_PURCHASED,
  REMOVE_PURCHASED,
  CLEAR_PURCHASED,
} from "../types/actionTypes";
import type { PurchasedTicket } from "../types/PurchasedTicket";

interface PurchasedState {
  items: PurchasedTicket[];
}

const loadFromLocalStorage = (): PurchasedTicket[] => {
  try {
    const data = localStorage.getItem("purchasedSeats");
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveToLocalStorage = (items: PurchasedTicket[]) => {
  try {
    localStorage.setItem("purchasedSeats", JSON.stringify(items));
  } catch {
    // Ignore localStorage write errors
  }
};

const initialState: PurchasedState = {
  items: loadFromLocalStorage(),
};

export const purchasedReducer = (
  state = initialState,
  action: any
): PurchasedState => {
  switch (action.type) {
    case ADD_PURCHASED: {
      const updatedItems = [...state.items, action.payload];
      saveToLocalStorage(updatedItems);
      return {
        ...state,
        items: updatedItems,
      };
    }
    case REMOVE_PURCHASED: {
      const updatedItems = state.items.filter(
        (item) =>
          !(
            item.flight.id === action.payload.flightId &&
            item.seatId === action.payload.seatId
          )
      );
      saveToLocalStorage(updatedItems);
      return {
        ...state,
        items: updatedItems,
      };
    }
    case CLEAR_PURCHASED: {
      saveToLocalStorage([]);
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
};
