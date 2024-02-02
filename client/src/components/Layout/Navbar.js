import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-blue-900 text-gray-300">
      <nav className="max-w-7xl mx-auto h-full flex justify-between items-center">
        <div className="text-3xl">Logo</div>
        <div className="flex  gap-6">
          <ul className="flex gap-6">
            <NavLink className="text-lg hover:underline" to="/">
              Home
            </NavLink>
            <NavLink className="text-lg hover:underline" to="about">
              About
            </NavLink>
            <NavLink className="text-lg hover:underline" to="/contact">
              Contact
            </NavLink>
            <NavLink className="text-lg hover:underline" to="/login">
              Login
            </NavLink>
          </ul>
          <NavLink className="px-6 py-2 bg-white text-black" to="/signup">
            SignUp
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
