import Header from "../Header/Header";
import { FlightsList } from "../FlightsList/FlightsList";

export const FlightsPage = () => {
  return (
    <div className="h-full min-h-screen bg-gradient-to-t from-cyan-500 to-blue-500">
      <Header />

      <FlightsList />
    </div>
  );
};
