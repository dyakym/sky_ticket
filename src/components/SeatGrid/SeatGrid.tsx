import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import { addPurchased, removePurchased } from "../../store/actions";

interface Seat {
  id: string;
  occupied: boolean;
}

interface SeatGridProps {
  totalSeats: number;
  remainingSeats: number;
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
}

export const SeatGrid: React.FC<SeatGridProps> = ({
  totalSeats,
  remainingSeats,
  flight,
}) => {
  const seatsPerRow = 6;
  const dispatch = useDispatch();
  const purchasedSeats = useSelector(
    (state: RootState) => state.purchased.items
  );

  const [seats, setSeats] = useState<Seat[][]>([]);

  const generateSeats = () => {
    const newSeats: Seat[] = [];

    const selectedSeats = purchasedSeats
      .filter((ticket) => ticket.flight.id === flight.id)
      .map((ticket) => ticket.seatId);

    const occupiedSeatsCount = totalSeats - remainingSeats;
    const randomOccupiedCount = occupiedSeatsCount - selectedSeats.length;

    for (let i = 0; i < totalSeats; i++) {
      newSeats.push({ id: "", occupied: false });
    }

    for (let i = 0; i < totalSeats; i++) {
      const rowNum = Math.floor(i / seatsPerRow) + 1;
      const seatNum = i % seatsPerRow;
      const letter = String.fromCharCode(65 + seatNum);
      newSeats[i].id = `${rowNum}${letter}`;
    }

    let occupiedAssigned = 0;
    while (occupiedAssigned < randomOccupiedCount) {
      const idx = Math.floor(Math.random() * totalSeats);
      const seat = newSeats[idx];
      const isAlreadySelected = selectedSeats.includes(seat.id);

      if (!seat.occupied && !isAlreadySelected) {
        seat.occupied = true;
        occupiedAssigned++;
      }
    }

    const seatsByRows: Seat[][] = [];
    for (let r = 0; r < Math.ceil(totalSeats / seatsPerRow); r++) {
      seatsByRows.push(newSeats.slice(r * seatsPerRow, (r + 1) * seatsPerRow));
    }

    return seatsByRows;
  };

  useEffect(() => {
    setSeats(generateSeats());
  }, []);

  const handleSeatClick = (seatId: string, occupied: boolean) => {
    if (occupied) return;

    const isSelected = purchasedSeats.some(
      (ticket) => ticket.flight.id === flight.id && ticket.seatId === seatId
    );

    try {
      if (isSelected) {
        dispatch(removePurchased(flight.id, seatId));
      } else {
        dispatch(addPurchased({ flight, seatId }));
      }
    } catch (error) {
      console.error("Error adding or removing purchased ticket:", error);
    }
  };

  return (
    <div className="inline-block p-2.5 border border-gray-300 rounded-lg mb-4 md:mb-8">
      {seats.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex mb-2">
          {row.map((seat, seatIndex) => {
            const isSelected = purchasedSeats.some(
              (ticket) => ticket.flight.id === flight.id && ticket.seatId === seat.id
            );

            let seatClasses = "w-8 h-8 md:w-14 md:h-14 rounded flex items-center justify-center font-bold select-none ";
            if (seat.occupied) {
              seatClasses += "bg-red-600 cursor-not-allowed ";
            } else if (isSelected) {
              seatClasses += "bg-yellow-400 cursor-pointer ";
            } else {
              seatClasses += "bg-green-500 cursor-pointer ";
            }
            seatClasses += seatIndex === 2 ? "mr-6 md:mr-12" : "mr-2";

            return (
              <div
                key={seat.id}
                title={`Місце ${seat.id}`}
                onClick={() => handleSeatClick(seat.id, seat.occupied)}
                className={seatClasses}
              >
                {seat.id}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
