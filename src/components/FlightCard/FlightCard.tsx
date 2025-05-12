import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { Tickets } from "../../types/Flights";

interface FlightCardProps {
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
  onAddFavorite: (id: string) => void;
  isFavorite: boolean;
}

export const FlightCard: React.FC<FlightCardProps> = ({
  id,
  airline,
  from,
  to,
  departureTime,
  arrivalTime,
  price,
  terminal,
  gate,
  tickets,
  onAddFavorite,
  isFavorite,
}) => {
  return (
    <Card sx={{ minWidth: 300 }}>
      <Link to={`/flights/${id}`}>
        <CardContent>
          <Typography variant="h6" component="div">
            Рейс: {id}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary">
            Авіакомпанія: {airline}
          </Typography>

          <Typography variant="body2">
            Напрямок: {from} → {to}
          </Typography>

          <Typography variant="body2">
            Час відправлення: {new Date(departureTime).toLocaleString()}
          </Typography>

          <Typography variant="body2">
            Час прибуття: {new Date(arrivalTime).toLocaleString()}
          </Typography>

          <Typography variant="body2">Ціна: {price}$</Typography>

          <Typography variant="body2">Термінал: {terminal}</Typography>

          <Typography variant="body2">Ворота: {gate}</Typography>

          <Typography variant="body2">
            Кількість квитків: {tickets.remaining}/{tickets.total}
          </Typography>
        </CardContent>
      </Link>

      <Box sx={{ p: 2 }}>
        <Button
          variant={isFavorite ? "contained" : "outlined"}
          color={isFavorite ? "primary" : "inherit"}
          fullWidth
          onClick={() => onAddFavorite(id)}
        >
          {isFavorite ? "В обраному" : "Додати в обране"}
        </Button>
      </Box>
    </Card>
  );
};
