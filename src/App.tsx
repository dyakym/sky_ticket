import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Cart } from './components/Cart/Cart';
import { FlightsPage } from './components/FlightsPage';
import { FlightDetailsPage } from './components/FlightDetailsPage/FlightDetailsPage';
import './App.css'

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<FlightsPage />} />
        <Route path="flights/:id" element={<FlightDetailsPage />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
