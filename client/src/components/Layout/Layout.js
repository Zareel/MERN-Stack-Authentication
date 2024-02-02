import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <main className="min-h-[77vh]">{children}</main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Authentication",
  description: "Mern Stack Project",
  keywords: "Mern Stack, project, mongodb, express, nodejs, reactjs, axios,",
  author: "Zareel",
};

export default Layout;
