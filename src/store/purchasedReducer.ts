import {
  ADD_PURCHASED,
  REMOVE_PURCHASED,
} from "../types/actionTypes";

interface PurchasedTicket {
  flightId: string;
  seatId: string;
}

interface PurchasedState {
  items: PurchasedTicket[];
}

const loadPurchased = (): PurchasedTicket[] => {
  try {
    const serialized = localStorage.getItem("purchased");
    if (!serialized) return [];
    return JSON.parse(serialized);
  } catch {
    return [];
  }
};

const savePurchased = (items: PurchasedTicket[]) => {
  try {
    localStorage.setItem("purchased", JSON.stringify(items));
  } catch {}
};

const initialState: PurchasedState = {
  items: loadPurchased(),
};

type PurchasedAction =
  | { type: typeof ADD_PURCHASED; payload: PurchasedTicket }
  | { type: typeof REMOVE_PURCHASED; payload: PurchasedTicket };

const isSameTicket = (a: PurchasedTicket, b: PurchasedTicket) =>
  a.flightId === b.flightId && a.seatId === b.seatId;

export const purchasedReducer = (
  state = initialState,
  action: PurchasedAction
): PurchasedState => {
  switch (action.type) {
    case ADD_PURCHASED:
      if (state.items.some((item) => isSameTicket(item, action.payload)))
        return state;
      const added = [...state.items, action.payload];
      savePurchased(added);
      return { items: added };

    case REMOVE_PURCHASED:
      const removed = state.items.filter(
        (item) => !isSameTicket(item, action.payload)
      );
      savePurchased(removed);
      return { items: removed };
    default:
      return state;
  }
};
