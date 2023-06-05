import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "#1DB954", height: "50px" }}>
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Link to="/" style={{ color: "#191414", textDecoration: "none", margin: "0 20px", fontSize: "24px" }}>
          MySpotify
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
