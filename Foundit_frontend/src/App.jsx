import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ResultsPage from "./pages/ResultsPage"; // We'll create this

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

