export interface Tickets {
  total: number;
  remaining: number;
}

export interface Flights {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  terminal: string;
  gate: string;
  tickets: Tickets;
}