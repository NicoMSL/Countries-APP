import React from "react";
import "./css/Country.css";


export default function Country({nombre, id, bandera, capital, continente, subregion, area, poblacion}){
return(
  <div className="div1">
    <h3>{nombre},{id}</h3>
    <p>Capital: {capital} </p>
    <p>Continente: {continente}</p>
    {/* <p>Cuenta con un area de: {area}km² y una Poblacion de: {poblacion}</p> */}
    <img className="bandera" src={bandera} alt="img not found"/>
  </div>
)}