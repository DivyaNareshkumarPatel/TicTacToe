import React, { useState, useEffect } from "react";

import "./Game.css";
import hoverx from "../Images/Hoverx.png";
import hovery from "../Images/Hovery.png";
import hollowStar from "../Images/hollowStar.png";
import hollowCircle from "../Images/hollowCircle.png";
import star1 from "../Images/star1.png";
import planet1 from "../Images/planet1.png";
import star from "../Images/star.png";
import planet from "../Images/planet.png";
import Winner from "./Winner";
export default function Game() {
  const initialBoardState = Array(9).fill({
    img: hoverx,
    className: "hover1",
    clicked: false,
  });

  const [board, setBoard] = useState(initialBoardState);
  const [turn, setTurn] = useState('X');
  const [hoverImg, setHoverImg] = useState(hoverx);
  const [winner, setWinner] = useState(null);
  const [starClass, setStarClass] = useState("cross");
  const [planetClass, setPlanetClass] = useState("");
  const [planetImg, setPlanetImg] = useState(hollowCircle)
  const [starImg, setStarImg] = useState(star1)
  useEffect(() => { 
    setHoverImg(turn === 'X' ? hoverx : hovery);
  }, [turn]);

  const handleClick = (index) => {
    if (board[index].clicked || winner) {
      return;
    }

    const newBoard = board.map((cell, i) => {
      if (i === index) {
        return { ...cell, img: turn === 'X' ? star : planet, className: "", clicked: true };
      }
      return cell;
    });
    setBoard(newBoard);

    const newTurn = turn === 'X' ? 'Y' : 'X';
    setTurn(newTurn);
    newTurn === 'X' ? setStarClass("cross") : setStarClass("");
    newTurn === 'X' ? setStarImg(star1) : setStarImg(hollowStar);
    newTurn === 'Y' ? setPlanetClass("planet1") : setPlanetClass("");
    newTurn === 'Y' ? setPlanetImg(planet1) : setPlanetImg(hollowCircle);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        board[a].img !== hoverx &&
        board[a].img !== hovery &&
        board[a].img === board[b].img &&
        board[a].img === board[c].img
      ) {
        setWinner(turn === 'X' ? 'Y' : 'X');
        return;
      }
    }

    if (board.every(cell => cell.clicked)) {
      setWinner('Draw');
    }
  };

  const restartGame = () => {
    setBoard(initialBoardState);
    setTurn('X');
    setHoverImg(hoverx);
    setWinner(null);
    setPlanetClass("");
    setPlanetImg(hollowCircle);
    setStarClass("cross");
    setStarImg(star1)
  };

  return (
    <div className="gameOuter">
      <div className="outerGameBoard">
        <div className="button">
          <div className="restart" onClick={restartGame}>RESTART</div>
        </div>
        <div className="flexBox">
          {board.map((cell, index) => (
            <div key={index} className={`bg${index + 1}`}>
              <div className="innerBg">
                <img
                  src={cell.clicked ? cell.img : hoverImg}
                  alt=""
                  className={`${cell.className} box`}
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundSize: "cover",
                    zIndex: 100,
                    position: "absolute",
                    cursor: cell.clicked ? "default" : "pointer",
                    borderTopLeftRadius: index === 0 ? "30px" : "",
                    borderTopRightRadius: index === 2 ? "30px" : "",
                    borderBottomLeftRadius: index === 6 ? "30px" : "",
                    borderBottomRightRadius: index === 8 ? "30px" : "",
                  }}
                  onClick={() => handleClick(index)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="lowerDiv">
          <div>
            <div className={`lowerCircle ${planetClass}`}>
              <img src={planetImg} alt="" className="circle" />
              <span style={{ fontWeight: "bold", fontSize: "20px", marginTop: "10px" }}>Planet</span>
            </div>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>V S</span>
          </div>
          <div className={`lowerStar ${starClass}`}>
            <img src={starImg} alt="" className="star" />
            <span style={{ fontWeight: "bold", fontSize: "20px", marginTop: "10px" }}>Star</span>
          </div>
        </div>
      </div>
      {winner && <Winner winner={winner} restartGame={restartGame}/>}
    </div>
  );
}
