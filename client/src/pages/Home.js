import React, { useContext } from "react";
import Layout from "../components/Layout/Layout";
import AuthContext from "../context/authContext.js";

const Home = () => {
  const { auth } = useContext(AuthContext);
  return (
    <Layout title={"Home"}>
      <div className="w-full h-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="w-full text-center py-10 text-4xl text-cyan-500">
            Home
          </h1>
          <pre>{JSON.stringify(auth, null, 4)}</pre>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
