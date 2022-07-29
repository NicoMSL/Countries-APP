import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAllActivities, getCountries, postActivity } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";




export default function Activity() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const allCountries = useSelector((state)=> state.countries)
  const allCountriesbd = useSelector((state)=> state.allCountriesState)


  const [input, setInput] = useState({
    id: "",
    nombre: "",
    dificultad: "",
    Duracion: "",
    temporada: "",
    countryId: [],
  });

  
  useEffect(() => {
    dispatch(getAllActivities());
  }, []);

function handleChange(e){
  setInput({
    ...input,
    [e.target.name]: e.target.value
  })
}

function handleSelect(e){
  allCountries.shift(e)
  setInput({
    ...input,
    countryId:[...input.countryId,e.target.value]
  })
}

function OnCloseFlag(id){
let depuratedIds = input.countryId.filter((el) => el !== id);
let addC = allCountriesbd.find(el => el.id === id)
console.log(addC)
  setInput({
    ...input,
    countryId: depuratedIds, // -> agrego al array el ID del pais
  });
}

function handleSubmit(e){
  e.preventDefault();
  console.log(input)
  dispatch(postActivity(input))
  alert("Activity Created")
  setInput({
    id: "",
    nombre: "",
    dificultad: "",
    Duracion: "",
    temporada: "",
    countryId: [],
  })
}



  return (
    <div>
      <Link to="/home">
        <button className="boton">Go Back</button>
      </Link>
      <h1>Create activity</h1>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label>Name: </label>
        <input type="text" value={input.nombre} autoComplete="off" placeholder="Please write a name..." name="nombre" onChange={(e)=>handleChange(e)}/>
        <label>Duration: </label>
        <input type="number" placeholder="Please write a number..." value={input.Duracion} name="Duracion" onChange={(e)=>handleChange(e)} />
        <label>Dificult: </label>
        <select value={input.dificultad} name="dificultad" onChange={(e)=>handleChange(e)}>
        <option hidden value="">Difficulty of the activity...</option>
        <option value="1">1 - Very Easy</option>
        <option value="2">2 - Easy</option>
        <option value="3">3 - Medium</option>
        <option value="4">4 - Difficult </option>
        <option value="5">5 - Very Difficult</option>
        </select>
        <label>Season: </label>
        <select value={input.temporada} name="temporada"onChange={(e)=>handleChange(e)}>
        <option hidden value="" >Season of the activity...</option>
        <option value="All the year">All the year</option>
        <option value="Fall">Fall</option>
        <option value="Summer">Summer</option>
        <option value="Spring">Spring</option>
        <option value="Winter">Winter</option>
        </select>
        <br/>
        <label>Countries: </label>
        <select value={input.countryId} name="countryId" onChange={(e)=>handleSelect(e)}>
        <option hidden value="">Countries to practice this activity...</option>
          {allCountries.map((c)=>(
            <option value={c.id}>{c.nombre}</option>
            
          ) )}
        </select>
        <ul><li>{input.countryId.map((c)=>(
          <div>
            <button type="button"   id="littleX" onClick={() => OnCloseFlag(c)} >x</button>
            <p>{c}</p>
            {/* <img  src={c.bandera}  alt="img" /> */}
          </div>
          ))}</li></ul>
        <button type="submit" className="boton">Create Activity</button>
      </form>
    </div>
  );
}
