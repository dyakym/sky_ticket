import axios from 'axios';
import type { Flights } from '../types/Flights';

const API_URL = "https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights"

export const getAllFlights = async ():Promise<Flights[]> => {
  const { data } = await axios.get<Flights[]>(`${API_URL}`);
  return data;
}

export const getFlightById = async (id: string) => {
  const { data } = await axios.get<Flights>(`${API_URL}/${id}`);
  return data;
}