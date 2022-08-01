
const initialState = {
  allCountriesState:[],
  countries: [],
  activities: [],
  detail: {}
}

function rootReducer (state= initialState, action){
  switch(action.type){
    case "GET_COUNTRIES":
      return{
        ...state,
        allCountriesState: action.payload,
        countries: action.payload
      }
    case "GET_ALL_ACTIVITIES":
      return{
        ...state,
        activities: action.payload
      }
    case "GET_NAME_COUNTRIES":
      return{
        ...state,
        countries: action.payload
      }
    case "FILTER_BY_CONTINET":
      const allCountries = state.allCountriesState
      const continentFiltered = action.payload === "All" ? allCountries : allCountries.filter(a=>a.continente === action.payload)
      return{
        ...state,
        countries: continentFiltered
      }

    case "FILTER_BY_ACTIVITY":
      const allCountriesa = state.allCountriesState
      const continentFiltered2 = allCountriesa.filter((c)=> c.activities.find((a) => a.id === action.payload));
      return{
        ...state,
        countries: continentFiltered2
      }
      
      case "ORDER_BY_NAME":
      let sortedArr = action.payload ==="abc"?
      state.countries.sort(function(a,b){
        if(a.nombre > b.nombre){
          return 1;
        }
        if(b.nombre>a.nombre){
          return -1;
        }
        return 0;
      }):
      state.countries.sort(function (a,b){
        if(a.nombre>b.nombre){
          return -1;
        }
        if(b.nombre>a.nombre){
          return 1;
        }
        return 0;
      })
      return{
        ...state,
        countries: sortedArr
      }

      case "ORDER_BY_POBLATION":
      let sortedArr2 = action.payload ==="asc"?
      state.countries.sort(function(a,b){
        if(a.poblacion < b.poblacion){
          return 1;
        }
        if(b.poblacion<a.poblacion){
          return -1;
        }
        return 0;
      }):
      state.countries.sort(function (a,b){
        if(a.poblacion<b.poblacion){
          return -1;
        }
        if(b.poblacion<a.poblacion){
          return 1;
        }
        return 0;
      })
      return{
        ...state,
        countries: sortedArr2
      }
      case "GET_DETAILS":
        return{
          ...state,
          detail: action.payload
        }
      case "POST_ACTIVITY":
        return{
          ...state,
          detail: action.payload
        }
      

    default:
      return state;
  }
}


export default rootReducer;