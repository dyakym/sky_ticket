import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart } from "./components/Cart/Cart";
import { FlightsPage } from "./components/FlightsPage/FlightsPage";
import { FlightDetailsPage } from "./components/FlightDetailsPage/FlightDetailsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightsPage />} />
        <Route path="flights/:id" element={<FlightDetailsPage />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
