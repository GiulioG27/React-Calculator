import Calculator from "./components/Calculator";
import Title from "./components/Title";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container fluid id="page-container">
      <div className="card text-center">
        <div className="card-header calculator-title">
          <Title>Calculator</Title>
        </div>
        <div className="card-body">
          <Calculator />
        </div>
      </div>
    </Container>
  );
}
export default App;
