import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/Navbar";
import ViewUsers from "./components/ViewUsers";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (isLoggedIn) {
      navigate("/viewUsers");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/registeration" element={<RegistrationForm />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/viewUsers" element={<ViewUsers />} />
      </Routes>
    </div>
  );
}

export default App;
