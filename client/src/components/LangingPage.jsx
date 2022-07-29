import React from "react";
import {Link} from "react-router-dom"
import "./css/LandingPage.css";


export default function LandingPage(){
    return(
        <div className="div">
            <h1 className="bienvenidos">Welcome to countries page</h1>
            <h2 className="subwelcome">find your place</h2>
            <p className="texto"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac nisl consequat, ultrices enim quis, fermentum lacus. Pellentesque egestas leo id mi finibus, eu auctor velit malesuada. Nulla facilisi. Nunc ligula ante, rutrum sit amet nunc sed, rhoncus convallis nisl. </p>
            <Link to="/home">
                <button className="boton" id="btnlanding" >Lets Go!</button>
            </Link>
        </div>
    )
}