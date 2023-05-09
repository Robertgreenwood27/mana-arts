import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 py-4 z-10">
      <div className="container mx-auto grid grid-cols-3 items-center px-4">
        <div className="text-white">
          Website by Robbie Greenwood
        </div>
        <div className="text-center text-zinc-400">
          <a href="https://mana-studio.vercel.app/desk" className="text-zinc-400 hover:text-white">
            Mana Arts&copy; {new Date().getFullYear()}
          </a>
        </div>
        <div className="text-right text-white">
          <i className="fas fa-cog"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
