import axios from "axios";

export function getCountries(){
  return async function(dispatch){
    var json = await axios.get("http://localhost:3001/countries",{});
    return dispatch({
      type:"GET_COUNTRIES",
      payload:json.data
    })
  }
}

export function getCountryByName(name){
  return async function(dispatch){
    try{
      var json = await axios.get("http://localhost:3001/countries?name=" + name)
      return dispatch({
        type: "GET_NAME_COUNTRIES",
        payload: json.data
      })
    }catch(error){
      console.log(error)
    }
  }
}

export function filterCountriesByContinent(payload){
  return{
    type: "FILTER_BY_CONTINET",
    payload
  }
}

export function orderByName(payload){
  return{
    type: "ORDER_BY_NAME",
    payload
  }
}

export function orderByPoblation(payload){
  return{
    type: "ORDER_BY_POBLATION",
    payload
  }
}

export function getDetail(id){
  return async function(dispatch){
    try{
      var json = await axios.get("http://localhost:3001/countries/"+ id);
      return dispatch({
        type:"GET_DETAILS",
        payload: json.data
      })
    }catch(error){
      console.log(error)
    }
  }
}

export function postActivity(payload){
  return async function(dispatch){
    const response = axios.post("http://localhost:3001/activity", payload);
    return dispatch({
      type: "POST_ACTIVITY",
      payload: response.data
    });

  }
}

export function getAllActivities(payload){
const response = axios.get("/activities");
return{
  type: "GET_ALL_ACTIVITIES",
  payload: response.data
}
}

