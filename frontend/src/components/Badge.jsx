import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Link
      to="https://www.linkedin.com/in/nikola-dragomirovi%C4%87-374343299/"
      target="_blank"
      rel="noopener noreferrer"
      name="linkedin"
      className="text-neutral-400 font-extralight p-4 bg-neutral-900 text-sm rounded-2xl outline outline-1 outline-neutral-700 animate-fade-down animate-delay-500"
    >
      By Nikola Dragomirović
    </Link>
  );
};

export default Footer;
