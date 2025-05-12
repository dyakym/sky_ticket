import { useEffect, useMemo, useState } from "react";
import { getFlightById } from "../../services/flightServices";
import { Link, useParams } from "react-router-dom";
import type { Flights } from "../../types/Flights";
import { Button, CircularProgress } from "@mui/material";
import Header from "../Header/Header";
import { SeatGrid } from "../SeatGrid/SeatGrid";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";

export const FlightDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flights | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const purchased = useSelector((state: RootState) => state.purchased.items);

  const { ticketCount, totalPrice } = useMemo(() => {
    if (!flight) return { ticketCount: 0, totalPrice: 0 };

    const currentFlightTickets = purchased.filter(
      (ticket) => ticket.flight.id === id
    );

    const count = currentFlightTickets.length;

    return {
      ticketCount: count,
      totalPrice: count * flight.price,
    };
  }, [purchased, flight]);

  useEffect(() => {
    const fetchFlights = async () => {
      if (id) {
        try {
          const response = await getFlightById(id);
          setTimeout(() => {
            setFlight(response);
            setLoading(false);
          }, 400);
        } catch (err) {
          setError("Помилка при завантаженні рейсів.");
          console.error(err);
          setLoading(false);
        }
      }
    };

    fetchFlights();
  }, [id]);

  if (error) return <div>{error}</div>;

  return (
    <div className="h-full min-h-screen bg-gradient-to-t from-cyan-500 to-blue-500">
      <Header />
      <div className="px-10 mx-auto max-w-[1200px]">
        {loading ? (
          <div className="flex justify-center items-center py-4">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <>
            {!loading && !flight ? (
              <div className="flex justify-center items-center h-[300px] text-white text-xl">
                Рейс не знайдено.
              </div>
            ) : (
              <>
                <div className="p-6 my-4 text-white flex justify-between border border-gray-300 rounded-lg">
                  <div className="space-y-4">
                    <h4 className="text-2xl"> Рейс:</h4>
                    <p> {id}</p>
                    <p>Авіакомпанія: {flight?.airline}</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xl">
                      Напрямок: {flight?.from} → {flight?.to}
                    </p>

                    <p>
                      Час відправлення:{" "}
                      {flight &&
                        new Date(flight.departureTime).toLocaleString()}
                    </p>

                    <p>
                      Час прибуття:{" "}
                      {flight && new Date(flight.arrivalTime).toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p>Термінал: {flight?.terminal}</p>
                    <p>Ворота: {flight?.gate}</p>
                  </div>
                </div>

                {flight && (
                  <>
                    <div className="flex justify-center">
                      <SeatGrid
                        totalSeats={flight.tickets.total}
                        remainingSeats={flight.tickets.remaining}
                        flight={flight}
                      />
                    </div>

                    <div className="flex flex-col items-center text-white pb-4 text-xl">
                      <p>Ціна одного квитка: {flight.price}$</p>

                      <div className="flex gap-10">
                        <p>Додано квитків: {ticketCount}</p>
                        <p>До оплати: ${totalPrice}</p>
                      </div>

                      <Button
                        component={Link}
                        to="/cart"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, fontSize: '18px' }}
                      >
                        Перейти до кошика
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
