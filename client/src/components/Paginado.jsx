import React from "react";
import "./css/Paginado.css";

export default function Paginado({ countriesPerPage,allCountries,paginado,setCountriesPerPage, currentPage,setCurrentPage }){
  const pageNumbers = [];

  for (let i = 1; i<=Math.ceil(allCountries/countriesPerPage) ; i++){
    pageNumbers.push(i);
  }
function handlePaginado(number,setCountriesPerPage){
  paginado(number)
  if(number>1){setCountriesPerPage(10)}
  if(number===1){setCountriesPerPage(9)}
}

function handleClick2(e) {
  if (e.target.value === "prev") {
    setCurrentPage(currentPage - 1);
  }
  if (e.target.value === "next") {
    setCurrentPage(currentPage + 1);
  }
  if (currentPage +1 > 1) {
    setCountriesPerPage(10);
  } 
  if (currentPage -1 === 1 && e.target.value == "prev") {
    setCountriesPerPage(9);
  }
}


  return (
    <nav>
      <ul className="paginado">
        {pageNumbers?.map(number => (
            <li className="number" key={number}>
            <a onClick={() => handlePaginado(number,setCountriesPerPage)} className={number === currentPage ?"numerito":"notnumerito"}>{number}</a>
            </li>
          ))}
      </ul>
      {currentPage == 1 ? (<div className="diva"/>) : (<button className="btnpn"id="pn"  value="prev" onClick={(e) => handleClick2(e)}>
        Previous </button> )}
        {/* <p id="pn"className="numerito" >{currentPage}</p> */}
        {(currentPage >= Math.ceil(allCountries/countriesPerPage)) ?(<div className="diva"/>) : (<button className="btnpn" id="pn"value="next" onClick={(e) => handleClick2(e)}>
          Next </button>
        )}
    </nav>
  )
}
