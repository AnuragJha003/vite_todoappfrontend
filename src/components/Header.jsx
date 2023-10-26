import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../main";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);//getting the value from the context
    //access whether the user is authenticated or not and change its value using set authenticated 

  const logoutHandler = async () => {
    setLoading(true);//setloading true
    //loading and setloading added in all possible pages and components where possible
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });//logout url given 

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);//when false when action desired done
    }
  };//and remaining thing same logout handler created 

  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (//if isauth true
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (//else yeh wala
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;