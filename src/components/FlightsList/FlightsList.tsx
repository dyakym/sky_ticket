import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllFlights } from "../../services/flightServices";
import type { Flights } from "../../types/Flights";
import { FlightCard } from "../FlightCard/FlightCard";
import {
  Button,
  CircularProgress,
  FormControl,
  NativeSelect,
  Typography,
} from "@mui/material";
import type { RootState } from "../../store/rootReducer";
import { toggleFavorite } from "../../store/actions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const FlightsList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [flights, setFlights] = useState<Flights[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("");
  const [departureLocation, setDepartureLocation] = useState<string>("");
  const [arrivalLocation, setArrivalLocation] = useState<string>("");

  const uniqueArrivalLocations = useMemo(() => {
    const locationsSet = new Set<string>();
    flights.forEach((flight) => {
      locationsSet.add(flight.to);
    });
    return Array.from(locationsSet).sort();
  }, [flights]);

  const uniqueDepartureLocations = useMemo(() => {
    const locationsSet = new Set<string>();
    flights.forEach((flight) => {
      locationsSet.add(flight.from);
    });
    return Array.from(locationsSet).sort();
  }, [flights]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getAllFlights();
        setTimeout(() => {
          setFlights(response);
          setLoading(false);
        }, 400);
      } catch (err) {
        setError("Помилка при завантаженні рейсів.");
        console.error(error);
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const matchesDeparture = departureLocation
        ? flight.from.toLowerCase().includes(departureLocation.toLowerCase())
        : true;
      const matchesArrival = arrivalLocation
        ? flight.to.toLowerCase().includes(arrivalLocation.toLowerCase())
        : true;
      return matchesDeparture && matchesArrival;
    });
  }, [flights, departureLocation, arrivalLocation]);

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (sortOption) {
      case "flightNumber":
        return a.id.localeCompare(b.id);
      case "dateAsc":
        return (
          new Date(a.departureTime).getTime() -
          new Date(b.departureTime).getTime()
        );
      case "dateDes":
        return (
          new Date(b.departureTime).getTime() -
          new Date(a.departureTime).getTime()
        );
      case "priceAsc":
        return a.price - b.price;
      case "priceDes":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const displayedFlights = showFavorites
    ? sortedFlights.filter((flight) => favorites.includes(flight.id))
    : sortedFlights;

  return (
    <div className="flex flex-col mx-auto xl:max-w-[1600px] pb-4 md:pb-9">
      <div className="flex justify-center mt-3 mb-5">
        <Button
          color="inherit"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <Typography variant="subtitle1" sx={{ textTransform: "none" }}>
            {showFavorites ? "Показати все" : "Відобразити обране"}
          </Typography>

          <span className="ml-2">
            {showFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </span>
        </Button>

        <FormControl sx={{ m: 1 }} variant="standard">
          <NativeSelect
            value={departureLocation}
            onChange={(e) => setDepartureLocation(e.target.value)}
          >
            <option value="">Виберіть пункт відправлення</option>
            {uniqueDepartureLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="standard">
          <NativeSelect
            value={arrivalLocation}
            onChange={(e) => setArrivalLocation(e.target.value)}
          >
            <option value="">Виберіть пункт призначення</option>
            {uniqueArrivalLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </NativeSelect>
        </FormControl>

        <FormControl sx={{ m: 1 }} variant="standard">
          <NativeSelect
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="flightNumber">Номер рейсу</option>
            <option value="dateAsc">За часом відправлення ↑</option>
            <option value="dateDes">За часом відправлення ↓</option>
            <option value="priceAsc">Ціна ↑</option>
            <option value="priceDes">Ціна ↓</option>
          </NativeSelect>
        </FormControl>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          {flights.length === 0 ? (
            <div>Рейсів не знайдено.</div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 md:gap-9">
              {!displayedFlights.length ? (
                <div className="flex justify-center items-center w-full pt-64">
                  <span className="text-center text-5xl max-w-[500px] leading-tight text-white">
                    Нажаль не було додано жодного рейсу в обрані
                  </span>
                </div>
              ) : (
                displayedFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    id={flight.id}
                    airline={flight.airline}
                    from={flight.from}
                    to={flight.to}
                    departureTime={flight.departureTime}
                    arrivalTime={flight.arrivalTime}
                    price={flight.price}
                    terminal={flight.terminal}
                    gate={flight.gate}
                    tickets={flight.tickets}
                    isFavorite={favorites.includes(flight.id)}
                    onAddFavorite={() => dispatch(toggleFavorite(flight.id))}
                  />
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
