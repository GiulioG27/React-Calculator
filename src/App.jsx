import Calculator from "./components/Calculator";
import Title from "./components/Title";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="page-wrap">
      <Title>Calculator</Title>
      <Calculator />
    </div>
  );
}
export default App;
