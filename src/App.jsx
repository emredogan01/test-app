import "./App.css";
import Scoops from "./comppnents/Scoops/"
import Toppings from "./comppnents/Toppings/"
import Form from "./comppnents/Form/"


function App() {
  return <div className="App d-flex flex-column gap-5 mt-4">
    {/* ürün çeşitleri */}
    <Scoops />
    {/* sos çeşitleri */}
    <Toppings />
    {/* form alanı */}
    <Form />
  </div>;
}

export default App;
