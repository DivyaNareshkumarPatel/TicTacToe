import React from "react";
import Circle from "../Images/Circle.png";
import Board from "../Images/HomeBoard.png";
import "./Home.css";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="mainDiv">
      <div className="board">
        <img src={Board} alt="" />
      </div>
      <div className="innerDiv">
        <div
          style={{ position: "absolute", top: -20, left: -40 }}
          className="circle1"
        >
          <img src={Circle} alt="Circle" style={{ height: "70px" }} />
        </div>
        <div
          style={{ position: "absolute", top: -20, right: -25 }}
          className="circle2"
        >
          <img src={Circle} alt="Circle" style={{ height: "70px" }} />
        </div>
        <div
          style={{ position: "absolute", bottom: -50, left: -40 }}
          className="circle3"
        >
          <img src={Circle} alt="Circle" style={{ height: "70px" }} />
        </div>
        <div
          style={{ position: "absolute", bottom: -50, right: -25 }}
          className="circle4"
        >
          <img src={Circle} alt="Circle" style={{ height: "70px" }} />
        </div>
        <div className="textDiv">
          TIC TAC TOE
          <Link to="/game" style={{textDecoration:"none", display:"block", width:"100%"}}>
            <div className="btn">Start</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
