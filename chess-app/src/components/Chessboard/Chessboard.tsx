
import './Chessboard.css';
import Tile from "../Tile/Tile";
import { useRef } from 'react';

const verticalAxis= ["1","2","3","4","5","6","7","8"];
const horizontalAxis = ["a","b","c","d","e","f","g","h"];

 interface Piece {
    image: string
    x: number
    y: number
 }

 const pieces: Piece[] = [];

 for (let p  =0 ; p < 2 ; p++){
    const type = p === 0 ? "b" : "w";
    const y = p === 0 ? 7 : 0;
    pieces.push({ image: `assets/images/rook_${type}.png` , x: 0 , y });
    pieces.push({ image: `assets/images/rook_${type}.png` , x: 7 , y });
    pieces.push({ image: `assets/images/bishop_${type}.png` , x: 5 , y});
    pieces.push({ image: `assets/images/bishop_${type}.png` , x: 2 , y });
    pieces.push({ image: `assets/images/knight_${type}.png` , x: 6 , y });
    pieces.push({ image: `assets/images/knight_${type}.png` , x: 1 , y });
    pieces.push({ image: `assets/images/queen_${type}.png` , x: 3 , y });
    pieces.push({ image: `assets/images/king_${type}.png` , x: 4 , y });
     
}

 for(let i = 0 ; i< 8 ; i++){
    pieces.push({ image: "assets/images/pawn_b.png" , x: i , y:6 });
    pieces.push({ image: "assets/images/pawn_w.png" , x: i , y:1 });
 }


    let activePiece: HTMLElement | null = null;
    let offsetX: number | null = null;
    let offsetY: number | null = null;
  
    function grabPiece(e: React.MouseEvent) {
      const element = e.target as HTMLElement;
      if (element.classList.contains("chess-piece")) {
        activePiece = element;
        const boundingBox = element.getBoundingClientRect();
        offsetX = e.clientX - boundingBox.left;
        offsetY = e.clientY - boundingBox.top;
      }
    }
  
    function movePiece(e: React.MouseEvent) {
      if (activePiece) {
        const x = e.clientX - offsetX!;
        const y = e.clientY - offsetY!;
        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`;
        activePiece.style.top = `${y}px`;
      }
    }
  
    function dropPiece(e: React.MouseEvent) {
      if (activePiece) {
        activePiece = null;
        offsetX = null;
        offsetY = null;
      }
    }


 
export default function Chessboard(){
    const chessboardRef=useRef(null);

    


    let board = [];

    for(let j = horizontalAxis.length-1 ; j >= 0 ; j--){
    for(let i = 0; i < verticalAxis.length; i++){
       
        const number = j + i + 2;
        let image = undefined;

        pieces.forEach((p) => {
            if(p.x === i && p.y===j){
                image = p.image;
            }
        });

        board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
}

    return<div
    onMouseDown={(e) => grabPiece(e)}
    onMouseMove={(e) => movePiece(e)}
    onMouseUp={(e) => dropPiece(e)}
    id="chessboard"
    ref={chessboardRef}
  >
        {board}
    </div>;
}