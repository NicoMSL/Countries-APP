import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountriesByContinent,
  filterCountriesByActivity,
  orderByName,
  orderByPoblation,
  getAllActivities,
} from "../actions";
import { Link } from "react-router-dom";
import Country from "./Country";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./css/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9); //countries por pagina
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const [orden, setOrden] = useState(``);
  const [orden2, setOrden2] = useState(``);

  // function asd(){
  //   setCountriesPerPage(10)
  // }

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllActivities());
    dispatch(getCountries());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  function handleSort(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado${e.target.value}`);
  }

  function handleSort2(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByPoblation(e.target.value));
    setOrden2(`Ordenado${e.target.value}`);
  }

  //filtrado
  function handleFilterContinent(e) {
    e.preventDefault();
    dispatch(filterCountriesByContinent(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterActivity(e) {
    e.preventDefault();
    dispatch(filterCountriesByActivity(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className="div">
      <h1 className="titulo">Look how many countries</h1>
      <button
        className="boton"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {" "}
        Reload countries
      </button>
      <Link to="/activity">
        <button className="boton">Create activity</button>
      </Link>
      <div className="filtrado">
        <h3>Filters:</h3>
        <div className="bloque">
          <p>Continent:</p>
          <select onChange={(e) => handleFilterContinent(e)}>
            <option value="All">All</option>
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
          <p>Activities:</p>
          <select onChange={(e) => handleFilterActivity(e)}>
            <option hidden value="">
              Select activity...
            </option>
            {activities.map((a) => (
              <option value={a.id} key={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="bloque">
          <p>Alphabetical order:</p>
          <select onChange={(e) => handleSort(e)}>
            <option hidden value="">
            Order alphabetically
            </option>
            <option value="abc">A to Z</option>
            <option value="zxy">Z to A</option>
          </select>
        </div>
        <div className="bloque">
          <p>Poblation:</p>
          <select onChange={(e) => handleSort2(e)}>
            <option hidden value="">
            Sort by population
            </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <SearchBar
        setCurrentPage={setCurrentPage}
        className="busqueda"
      ></SearchBar>
      <Paginado
        setCountriesPerPage={setCountriesPerPage}
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginado={paginado}
      />

      {currentCountries?.map((a) => {
        return (
          <Link to={"/details/" + a.id}>
            <fragment className="tarjeta">
              <Country
                nombre={a.nombre}
                id={a.id}
                bandera={a.bandera}
                capital={a.capital}
                continente={a.continente}
                subregion={a.subregion}
                area={a.area}
                poblacion={a.poblacion}
              />
              <p>click to watch details</p>
            </fragment>
          </Link>
        );
      })}
    </div>
  );
}
