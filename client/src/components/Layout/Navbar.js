import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const { data } = await axios.post("/api/v1/auth/logout");
      if (data.success) {
        alert(data.message);
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while logging out");
    }
  };

  return (
    <div className="w-full h-24 bg-green-900 text-gray-300">
      <nav className="max-w-7xl mx-auto h-full flex justify-between items-center">
        <div className="text-3xl font-semibold text-cyan-500">Logo</div>
        <div className="flex  gap-6">
          <ul className="flex gap-6 items-center">
            <NavLink className="text-xl hover:underline" to="/">
              Home
            </NavLink>
            {auth.user ? (
              <div className="flex gap-6">
                <NavLink className="text-xl hover:underline" to="about">
                  About
                </NavLink>
                <NavLink className="text-xl hover:underline" to="/contact">
                  Contact
                </NavLink>
                <NavLink
                  onClick={handleLogOut}
                  className="text-lg hover:underline"
                >
                  LogOut
                </NavLink>
              </div>
            ) : (
              <div className="flex gap-6 items-center">
                <NavLink className="text-xl hover:underline" to="/login">
                  Login
                </NavLink>
                <NavLink className="px-6 py-2 bg-white text-black" to="/signup">
                  SignUp
                </NavLink>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
