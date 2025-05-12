export interface PurchasedTicket {
  flight: {
    id: string;
    airline: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    terminal: string;
    gate: string;
  };
  seatId: string;
}
