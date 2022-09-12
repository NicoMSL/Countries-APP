import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAllActivities, getCountries, postActivity } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./css/Activity.css";




export default function Activity() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const allCountries = useSelector((state)=> state.countries)
  const allCountriesbd = useSelector((state)=> state.allCountriesState)
  const [errors, setErrors] = useState({})


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
    dispatch(getCountries());
  }, []);

function handleChange(e){
  setInput({
    ...input,
    [e.target.name]: e.target.value
  })
}

function handleCheck(e){
  if(e.target.checked)
  setInput({
    ...input,
    temporada:e.target.value
    //temporada:[...input.temporada,e.target.value]
  })
}

function handleSelect(e){
  //allCountries.shift(e)
  if(input.countryId.includes(e.target.value)){return}
  setInput({
    ...input,
    countryId:[...input.countryId,e.target.value]
  })
}

function OnCloseFlag(id){
  let depuratedIds = input.countryId.filter((el) => el !== id);
  //allCountries.push(allCountriesbd.filter(a=>a.id))
  //console.log(allCountriesbd.filter(a=>a.id))
  setInput({
    ...input,
    countryId: depuratedIds, // -> agrego al array el ID del pais
  });
}

function validacion(input){
  let errors = {};
  if(!input.nombre){errors.nombre="Please complete the name of the activity"}
  if(!/^[a-zA-Z\s]*$/.test(input.nombre)) {errors.nombre = "Please only use letters";}
  if(input.Duracion>6 ||input.Duracion<1){errors.Duracion = "Select a duration between 1hs and 6hs";}
  if(input.dificultad === ""){errors.dificultad = "Please select a difficulty";}
  if(input.temporada === ""){errors.temporada = "Please select a season";}
  //if(input.temporada.length === 0){errors.temporada = "Please select a season";}
  //if(input.temporada.length > 1){errors.temporada = "Please select only one season";}
  //if(input.temporada.length > 1 && input.temporada.includes("All the year")){errors.temporada = `You can not select "All the year" and another option`;}
  if(input.countryId.length === 0){errors.countryId = "Please select at least one country";}
  

  return errors
}

function handleSubmit(e){
  e.preventDefault();
  let val = validacion(input);
  setErrors(val)
  if(Object.keys(val).length >0 ){
    alert("Fix errors");
    val = {}
    return
  }
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
    <div className="div">
      <Link to="/home">
        <button className="boton" id="btna">Go Back</button>
      </Link>
      <h1>Create activity</h1>
      <form className="from" onSubmit={(e)=>handleSubmit(e)}>
        <label className="sep">Name: </label>
        <input  className="sep" type="text" value={input.nombre} autoComplete="off" placeholder="Please write a name..." name="nombre" onChange={(e)=>handleChange(e)}/><br/>
        {errors.nombre &&<p className="err">{errors.nombre}</p>}
        <label className="sep">Duration {"(1 to 6 hours)"}: </label>
        <input className="sep" type="number" placeholder="in hs" min="1" max="6" value={input.Duracion} name="Duracion" onChange={(e)=>handleChange(e)} /> <br/>
        {errors.Duracion &&<p className="err">{errors.Duracion}</p>}
        <label className="sep">Dificult: </label>
        <select className="sep" value={input.dificultad} name="dificultad" onChange={(e)=>handleChange(e)}> <br/>
        <option hidden value="">Difficulty of the activity...</option>
        <option value="1">1 - Very Easy</option>
        <option value="2">2 - Easy</option>
        <option value="3">3 - Medium</option>
        <option value="4">4 - Difficult </option>
        <option value="5">5 - Very Difficult</option>
        </select><br/>
        {errors.dificultad &&<p className="err">{errors.dificultad}</p>}

        <label className="sep">Season: </label><br/>
        <div>
        <label><input onChange={(e)=>handleCheck(e)} className="checkB" type="radio" name="check" value="All the year"  />All the year</label><br/>
        <label><input onChange={(e)=>handleCheck(e)} className="checkB" type="radio" name="check" value="Summer" />Summer</label>
        <label><input onChange={(e)=>handleCheck(e)} className="checkB" type="radio" name="check" value="Fall" />Fall</label><br/>
        <label><input onChange={(e)=>handleCheck(e)} className="checkB" type="radio" name="check" value="Spring" />Spring</label>
        <label><input onChange={(e)=>handleCheck(e)} className="checkB" type="radio" name="check" value="Winter" />Winter</label><br/>
        </div>
        
        {/* <select className="sep"value={input.temporada} name="temporada"onChange={(e)=>handleChange(e)}>
        <option hidden value="" >Season of the activity...</option>
        <option value="All the year">All the year</option>
        <option value="Fall">Fall</option>
        <option value="Summer">Summer</option>
        <option value="Spring">Spring</option>
        <option value="Winter">Winter</option>
        </select><br/> */}
        {errors.temporada &&<p className="err">{errors.temporada}</p>}


        <label className="sep">Countries: </label>
        <select className="sep"  value={input.countryId} name="countryId" onChange={(e)=>handleSelect(e)}>
        <option hidden value="">Countries to practice this activity...</option>
          {allCountries.map((c)=>(
            <option value={c.id}>{c.nombre}</option>
          ))}
        </select>
        {errors.countryId &&<p className="err">{errors.countryId}</p>}
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
