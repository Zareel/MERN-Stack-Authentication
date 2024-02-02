import React from "react";

const Footer = () => {
  return (
    <footer className="px-4 py-8 dark:bg-gray-800 dark:text-gray-400">
      <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
        <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
          <div className="flex items-center justify-center ">
            <h1 className="text-3xl text-cyan-500">Authentication</h1>
          </div>
        </div>
        <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
          <li>
            <a
              href="https://www.instagram.com/zareel_kalam/?hl=en"
              className="text-lg text-gray-400 hover:text-gray-200 cursor-pointer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/zareel.kalam"
              className="text-lg text-gray-400 hover:text-gray-200 cursor-pointer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/zareel-kalam-2a3a85249/"
              className="text-lg text-gray-400 hover:text-gray-200 cursor-pointer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
