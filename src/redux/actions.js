import axios from 'axios';
export const GET_GAMES = 'GET_GAMES';
export const GET_GAME_NAME = 'GET_GAME_NAME';
export const GET_GAME_ID = 'GET_GAME_ID';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_GENRES = 'GET_GENRES';
export const SET_SELECTED_GENRE = 'SET_SELECTED_GENRE';
export const SET_SELECTED_PLATFORM = 'SET_SELECTED_PLATFORM';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_USER_DATA = 'SET_USER_DATA';
export const RESET_FILTERS = 'RESET_FILTERS';

export const getGames = ()=>{ 
  return async function(dispatch) {
  try {
   const dataGm = (await axios.get('http://localhost:3001/videogame')).data;
   return dispatch({
      type: GET_GAMES, 
      payload: { games: dataGm }
    });
    
  } catch (error) {
    console.log(error.message)
  }
}
};
export const gameByName = (name)=> {
return async function(dispatch) {
  try {
    const {data} = await axios.get(`http://localhost:3001/videogame/?name=${name}`);
            
      return dispatch({
      type: GET_GAME_NAME, 
      payload: data 
    })
    
  } catch (error) {
    console.log(error.message)
  }
}
};
export const gameById = (id)=> {
return async function(dispatch) {
  try {
    const dataId = (await axios.get(`http://localhost:3001/videogame/${id}`)).data;

      return dispatch({
      type: GET_GAME_ID,
      payload: dataId
     })

  } catch (error) {
    console.log(error.message)
  }
}
};
export const gamePlataforms = ()=> {
  return async function(dispatch) {
    try {
      const dataPl = (await axios.get('http://localhost:3001/platform')).data;
      return dispatch({
        type: GET_PLATFORMS,
        payload: dataPl
      });
    } catch (error) {
      console.log(error.message)
    }
  }
};
export const gameGenres = ()=> {
  return async function(dispatch) {
    try {
      const dataGn = (await axios.get('http://localhost:3001/genre')).data;
      return dispatch({
        type: GET_GENRES,
        payload: dataGn
      });
    } catch (error) {
      console.log(error.message)
    }
  }
};
export const setSelectedGenre = (genre) => {
  return {
    type: SET_SELECTED_GENRE,
    payload: genre
  }
};
export const setSelectedPlatform = (platform) => {
  return {
    type: SET_SELECTED_PLATFORM,
    payload: platform
  }
};
export const resetFilters = () => {
  return {
    type: RESET_FILTERS
  }
}
export function postRegister(payload){
  return async function(){
    const data = await
    axios.post("http://localhost:3001/user/register",payload)
    return data
  }
}
export function postLogin(payload){
  return async function(){
    const data = await
    axios.post("http://localhost:3001/user/login",payload)
    return data
  }
}
export function setUserData(userData) {
  return {
    type: SET_USER_DATA,
    payload: userData,
  };
}
export function setAuthenticated(isAuthenticated) {
  return {
    type: SET_AUTHENTICATED,
    payload: isAuthenticated,
  };
}

