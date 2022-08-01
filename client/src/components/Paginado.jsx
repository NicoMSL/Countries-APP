import React from "react";
import "./css/Paginado.css";

export default function Paginado({ countriesPerPage,allCountries,paginado,setCountriesPerPage }){
  const pageNumbers = [];

  for (let i = 1; i<=Math.ceil(allCountries/countriesPerPage) ; i++){
    pageNumbers.push(i);
  }
function handlePaginado(number,setCountriesPerPage){
  paginado(number)
  if(number>1){setCountriesPerPage(10)}
  if(number===1){setCountriesPerPage(9)}
}

  return (
    <nav>
      <ul className="paginado">
        {pageNumbers?.map(number => (
            <li className="number" key={number}>
            <a onClick={() => handlePaginado(number,setCountriesPerPage)} >{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  )
}
