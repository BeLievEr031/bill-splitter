import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="wrapper">
      <div className="card card-1">
        <h2 className="card__title">
          WelCome to Our WebSite. where You can Split Bill Among Your Friends
        </h2>
        <p className="card__apply">
          <Link to={"/auth"} className="card__link">
            Split Bill Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Home;
