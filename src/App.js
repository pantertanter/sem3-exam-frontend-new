import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "react-bootstrap";
import userFacade from "./auth/userFacade";
import NavBar from "./components/nav/NavBar";
import Hero from "./components/Hero";
import AllJokes from "./components/admin_tables/AllJokes";
// PAGES:
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import NoMatchPage from "./pages/NoMatchPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignupPage from "./pages/SignupPage";


export default function App() {
  const navigate = useNavigate();
  const { login, logout, loggedIn, getUser } = userFacade();
  const [loggedInState, setLoggedInState] = useState(loggedIn());
  const [userState, setUserState] = useState(getUser());

  function logoutProtocol() {
    if (loggedInState) setLoggedInState(false);
    logout();
    setUserState(null);
    navigate("/");
  }

  function loginProtocol(user, pass) {
    return login(user, pass)
      .then(res => {
        setUserState(res);
        if (!loggedInState) setLoggedInState(true);
        if (res.roles.includes("user")) {
          navigate("/AllJokes");
        }
        else if (res.roles.includes("admin")) {
          navigate("/admin");
        }
        else {
          navigate("/");
        }
      });
  }

  return (
    <Container fluid="sm" className="wrapper">
      <Hero />
      <NavBar loggedIn={loggedInState} user={userState} />
      <Container className="pageContent pt-3 pb-3" fluid="sm">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage login={loginProtocol} />} />
          <Route path="/logout" element={<LogoutPage logout={logoutProtocol} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </Container>
    </Container>
  );
}
