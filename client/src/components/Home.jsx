import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getCountries, filterCountriesByContinent, orderByName, orderByPoblation } from "../actions";
import { Link } from "react-router-dom"
import Country from "./Country";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Activity from "./Activity";
import "./css/Home.css";



export default function Home(){

const dispatch = useDispatch()
const allCountries = useSelector((state)=> state.countries)
//paginado
const [currentPage, setCurrentPage] = useState(1) 
const [countriesPerPage, setCountriesPerPage] = useState(10) //countries por pagina
const indexOfLastCountry = currentPage * countriesPerPage
const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
const currentCountries = allCountries.slice(indexOfFirstCountry,indexOfLastCountry)

const [orden, setOrden] = useState(``)
const [orden2, setOrden2] = useState(``)

const activities = useSelector((state) => state.activities);

const paginado = (pageNumber) =>{
  setCurrentPage(pageNumber)
}

useEffect(()=>{
  dispatch(getCountries());
},[dispatch])

function handleClick(e){
e.preventDefault();
dispatch(getCountries())
}

function handleSort(e){
  e.preventDefault();
  setCurrentPage(1);
  dispatch( orderByName(e.target.value))
  setOrden(`Ordenado${e.target.value}`)
};

function handleSort2(e){
  e.preventDefault();
  setCurrentPage(1);
  dispatch( orderByPoblation(e.target.value))
  setOrden2(`Ordenado${e.target.value}`)
};



//filtrado
function handleFilterContinent(e){
  e.preventDefault();
  
  dispatch(filterCountriesByContinent(e.target.value))
}



return(
  <div className="div">
    <h1 className="titulo">Look how many countries</h1>
    <button className="boton" onClick={e=>{handleClick(e)}}> Reload countries</button>
    <Link to= "/activity"><button className="boton">Create activity</button></Link>

<div className="filtrado">
      <h3>Filter continets:</h3> 
  <div className="bloque">
    <p>Continente:</p>
      <select onChange={e=>handleFilterContinent(e)}>
        <option value="All">Todos</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
      </select>
  </div>
  <div className="bloque">
    <p>Actividades:</p>
    <select>
        <option hidden value="">Select activity...</option>
          {activities.map((a)=>(
            <option>{a.nombre}</option>
            ) )}
        </select>
  </div>
  <div className="bloque">
    <p>Orden Alfabetico:</p>
      <select onChange={e=>handleSort(e)}>
      <option hidden value="">Ordenar alfabeticamente</option>
        <option value="abc">A to Z</option>
        <option value="zxy">Z to A</option>
      </select>
  </div>
  <div className="bloque">
    <p>Poblacion:</p>
      <select onChange={e=>handleSort2(e)}>
      <option hidden value="">ordenar por poblacion</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
  </div>
</div>
<SearchBar className="busqueda"></SearchBar>
<Paginado 
countriesPerPage={countriesPerPage}
allCountries={allCountries.length}
paginado= {paginado}
/>

    {currentCountries.map((a)=>{
      return(
        <fragment className="tarjeta">
          <Link to={"/details/" + a.id}>
        <Country  nombre={a.nombre} id={a.id} bandera={a.bandera} capital={a.capital} continente={a.continente} subregion={a.subregion} area={a.area} poblacion={a.poblacion}/> 
          </Link>
        </fragment>
        ); 
      })
    }

  </div>
)
}