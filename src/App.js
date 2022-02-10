import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import VoteMain from "./Pages/VoteMain";
import ProgressBar from "./Components/ProgressBar";
import ResultPage from "./Pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/vote-main" element={<VoteMain />} />
          <Route path="/vote-main/:id" element={<ResultPage />} />

          <Route path="/" element={<Home />} />
        </Routes>
        {/* <ProgressBar bgcolor="blue" progress="70" height={5} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
