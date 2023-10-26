import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";

function App() {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {//adding the profile section users/me router in here
    setLoading(true);
    axios
      .get(`${server}/users/me`, {//adding it to the server get request
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);//setting the value of the user object to the response data user value 
        //to get the profile of the user logged in 
        setIsAuthenticated(true);
        setLoading(false);
      })//doing the action while being in a try block 
      .catch((error) => {//catch block 
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;