import "./App.css";
import Header from "./Components/Header";
import QuestionCard from "./Components/QuestionCard";
import Choices from "./Components/Choices";

function App() {
  return (
    <div className="App">
      <Header />
      <QuestionCard />
      <h5 className="title">المرشحين</h5>
      <Choices />
    </div>
  );
}

export default App;
