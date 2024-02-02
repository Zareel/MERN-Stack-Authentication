import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(name, email, password, phone, address);
    try {
      const { data } = await axios.post("/api/v1/auth/signup", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data.success) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in signing in");
    }
  };

  return (
    <Layout title={"SignUp"}>
      <div className="w-full h-full px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center py-10 text-4xl text-cyan-500">SignUp</h1>

          <div className="w-full h-auto ">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center justify-center gap-6"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-[40%] px-6 py-2 outline-none border-none bg-gray-700 text-black font-semibold tracking-wider rounded-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-[40%] px-6 py-2 outline-none border-none bg-gray-700 text-black font-semibold tracking-wider rounded-md"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-[40%] px-6 py-2 outline-none border-none bg-gray-700 text-black font-semibold tracking-wider rounded-md"
              />
              <input
                type="text"
                name="phone"
                placeholder="Mobile no:"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-[40%] px-6 py-2 outline-none border-none bg-gray-700 text-black font-semibold tracking-wider rounded-md"
              />
              <input
                type="text"
                name="address"
                placeholder="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-[40%] px-6 py-2 outline-none border-none bg-gray-700 text-black font-semibold tracking-wider rounded-md"
              />
              <button
                type="submit"
                className="bg-cyan-500 text-black px-6 py-2 rounded-md "
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
