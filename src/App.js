import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import VoteMain from "./Pages/VoteMain";
import ResultPage from "./Pages/ResultPage";
import QrCode from "./Pages/QrCode";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/vote-main" element={<VoteMain />} />
          <Route path="/vote-main/:id" element={<ResultPage />} />
          <Route path="/qr-code" element={<QrCode text="ola" />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
