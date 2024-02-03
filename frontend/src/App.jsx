import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import ShowAllRequests from "./components/ShowAllRequests";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <HomePage /> */}
      <ShowAllRequests />
    </>
  );
}

export default App;
