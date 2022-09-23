import axios from "axios";
const url = "https://countriesnmsl.herokuapp.com"

export function getCountries(){
  return async function(dispatch){
    var json = await axios.get(`${url}/countries`,{});
    return dispatch({
      type:"GET_COUNTRIES",
      payload:json.data
    })
  }
}


export function getAllActivities(){
  return async function(dispatch){
var json = await axios.get(`${url}/activity`,{});
return dispatch({
  type: "GET_ALL_ACTIVITIES",
  payload: json.data
})
}
}

export function getCountryByName(name){
  return async function(dispatch){
    try{
      var json = await axios.get(`${url}/countries?name=` + name)
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

export function filterCountriesByActivity(payload){
  return{
    type: "FILTER_BY_ACTIVITY",
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
      await axios.get(`${url}/countries/`+ id)
      .then((el) =>{
      return dispatch({
        type:"GET_DETAILS",
        payload: el.data
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  }
}

// export function getDetail(id){
//   return function(dispatch){
//     try{
//       var json = await axios.get(`${url}/countries/`+ id);
//       return dispatch({
//         type:"GET_DETAILS",
//         payload: json.data
//       })
//     }catch(error){
//       console.log(error)
//     }
//   }
// }

export function postActivity(payload){
  return async function(dispatch){
    const json = await axios.post(`${url}/activity`, payload);
    return dispatch({
      type: "POST_ACTIVITY",
      payload: json.data
    });
  }
}

export function deleteActivity(id){
  return async function(dispatch){
      const json = await axios.delete(`${url}/activity/`+id)
      return dispatch({
        type: "DELETE_ACTIVITY",
        PAYLOAD: json.data
      });
  }
}


