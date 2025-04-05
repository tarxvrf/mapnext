import React from "react";
import { poppins } from "@/fonts/fonts";


function Hero() {
  return (
    <div className={`mainhero`}>    
      <div className={`heroframetitle ${poppins.className}`}>
        <div>
          <h1 className="herotitle">My Future </h1>
          <h2 className="herosubtitle">Start From Here</h2>
        </div>
        <div>
          <button className="herobutton ">explore</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
