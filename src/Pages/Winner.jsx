import React, { useState, useEffect } from "react";
import "./Winner.css";
import star from "../Images/star1.png";
import planet from "../Images/planet1.png";
import draw from "../Images/draw.png";
import Confetti from 'react-confetti';
export default function Winner({ winner, restartGame }) {
  const [background, setBackground] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const[left, setLeft] = useState("");
  const [display, setDisplay] = useState("block");
  useEffect(() => {
    if (winner === 'X') {
      setBackground("#E9B98B");
      setImage(planet);
      setText("PLANET WINS")
      setLeft("45%")
      setDisplay("block")
    } else if (winner === 'Y') {
      setBackground('#C6D4D9');
      setImage(star);
      setText("STAR WINS")
      setLeft("45%")
      setDisplay("block")
    } else if (winner === 'Draw') {
      setBackground('#fdabab');
      setImage(draw)
      setText("DRAW")
      setLeft("41%")
      setDisplay("none");
    }
  }, [winner]);

  return (
    <div className="winOut">
      <div style={{display:display}}>
        <Confetti/>
      </div>
      <div className="winIn">
        <div
          style={{
            background: background,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
            height: "200px",
          }}
          className="shadow"
        >
          <div>
            <div>
              <img src={image} alt="" style={{left:left}}/>
            </div>
            <div style={{ padding: "20px" , fontSize:"1.2em"}}>
              <h1>{text}</h1>
            </div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <div className="restart restartButton" onClick={restartGame} style={{width:"100px", marginBottom:"10px"}}>RESTART</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
