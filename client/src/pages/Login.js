import React, { useState, useContext } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        alert(data.message);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while logging in");
    }
  };
  return (
    <Layout title={"Login"}>
      <div className="w-full h-full">
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center py-10">
          <h1 className="text-center py-10 text-4xl text-cyan-500">Login</h1>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-6 items-center"
          >
            <input
              className="w-[40%] px-6 py-2 outline-none border-none bg-gray-700 text-white font-semibold tracking-wider rounded-md"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-[40%] px-6 py-2 outline-none border-none bg-gray-700 text-white font-semibold tracking-wider rounded-md"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-cyan-500 text-black px-6 py-2 rounded-md "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
