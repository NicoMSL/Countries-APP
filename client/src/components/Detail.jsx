import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import "./css/Detail.css";

export default function Detail(props) {
  const id = props.match.params.id;
  const myCountry = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  //console.log("id", id, myCountry);
  
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  //console.log("MY COUNTRY", myCountry)

  return (
    <div className="div">
      <div>
        <h1>{myCountry.nombre + ", " + myCountry.id}</h1>
        <img src={myCountry.bandera} alt="img not found" />
        <h5>
          Capital: {myCountry.capital} Continente: {myCountry.continente}
        </h5>
        <h6>{myCountry.subregion}</h6>
        <p>
          Cuenta con un area de: {myCountry.area}km² y una Poblacion de:{" "}
          {myCountry.poblacion}
        </p>
        <div >
          {myCountry.activities?.length > 0 ?(
            myCountry.activities.map((a) => (
              <div className="tarjetaActividad" >
                <p>Actividad: {a.nombre}</p>
                <p>Duracion: {a.Duracion} hs</p>
                <p>Dificultad: {a.dificultad}/5</p>
                <p>Temporada: {a.temporada}</p>
              </div>
            )
          )):(<p>No posee actividades creadas</p>)}
        </div>
      </div>

      <Link to="/home">
        <button className="boton"> Go back</button>
      </Link>
    </div>
  );
}
