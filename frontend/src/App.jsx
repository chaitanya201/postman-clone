import "./App.css";
import HomePage from "./pages/HomePage";
import ShowAllRequests from "./components/ShowAllRequests";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddReq from "./components/AddReq";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/view-reqs" />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/view-reqs" element={<ShowAllRequests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
