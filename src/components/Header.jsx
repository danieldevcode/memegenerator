import React from "react";
import trollFace from "../assets/troll-face.png"

export default function Header(){
    return (
        <header>
            <img src={trollFace} alt="Troll face logo" />
            <p>Meme generator</p>
        </header>
    )
}