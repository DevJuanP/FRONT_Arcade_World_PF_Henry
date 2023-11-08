import axios from 'axios';
export const GET_GAMES = 'GET_GAMES';
export const GET_GAME_NAME = 'GET_GAME_NAME';
export const GET_GAME_ID = 'GET_GAME_ID';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_GENRES = 'GET_GENRES';
export const SET_SELECTED_GENRE = 'SET_SELECTED_GENRE';
export const SET_SELECTED_PLATFORM = 'SET_SELECTED_PLATFORM';
export const FILTER_GAMES = 'FILTER_GAMES';
export const SORT_GAMES_ASC = 'SORT_GAMES_ASC';
export const SORT_GAMES_DESC = 'SORT_GAMES_DESC';
export const FILTER_GAMES_BY_PRICE = 'FILTER_GAMES_BY_PRICE';
export const RESET_PLATFORM_FILTER = 'RESET_PLATFORM_FILTER';
export const RESET_GENRE_FILTER = 'RESET_GENRE_FILTER';
export const RESET_FILTERS = 'RESET_FILTERS';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_USER_DATA = 'SET_USER_DATA';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const ADD_COMMENT = 'ADD_COMMENT';
export const LOGOUT = 'LOGOUT';
export const DELETE_ITEM_CART = 'DELETE_ITEM_CART';
export const ADD_NEWS_PURCHASED = 'ADD_NEWS_PURCHASED';
export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_ITEM = 'DELETE_ITEM'
export const GET_USER='GET_USER'
export const SET_SELECTED_PRICE = 'SET_SELECTED_PRICE'



export const getGames = ()=>{ 
  return async function(dispatch) {
  try {
   const dataGm = (await axios.get('http://localhost:3001/videogame')).data;
   localStorage.setItem("allGames", JSON.stringify(dataGm));
   return dispatch({
      type: GET_GAMES, 
      payload: dataGm
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
export const setSelectedPrice = (price) => {
  return {
    type: SET_SELECTED_PRICE,
    payload: price
  }
};
export const filterGames = () => {
  return (dispatch, getState) => {
    const { allGames, selectedGenre, selectedPlatform, selectedPrice } = getState();
    let filteredGames = [...allGames]; // Crear una copia del array
    if (selectedGenre && selectedGenre !== "") {
      filteredGames = filteredGames.filter((game) =>
        game.genres.includes(selectedGenre)
      );
    }
    if (selectedPlatform && selectedPlatform !== "") {
      filteredGames = filteredGames.filter((game) =>
        game.platforms.includes(selectedPlatform)
      );
    }
    if (selectedPrice && selectedPrice !== "") {
      filteredGames = filteredGames.filter((game) =>
        game.price <= selectedPrice
      );
    }
    // Ordenar los juegos por precio de mayor a menor
    filteredGames.sort((a, b) => b.price - a.price);
    dispatch({
      type: FILTER_GAMES,
      payload: filteredGames,
    });
  };
};
export const sortGamesAsc = () => ({
  type: SORT_GAMES_ASC,
});

export const sortGamesDesc = () => ({
  type: SORT_GAMES_DESC,
});
export const filterGamesByPrice = (price) => ({
  type: FILTER_GAMES_BY_PRICE,
  payload: price,
});
export const resetPlatformFilter = () => {
  return {
    type: RESET_PLATFORM_FILTER,
  }
};
export const resetGenreFilter = () => {
  return {
    type: RESET_GENRE_FILTER,
  }
};
export const resetFilters = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_FILTERS,
    });
    dispatch(filterGames());
  };
};
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

export const addToFavorites = (game) => ({
  type: ADD_TO_FAVORITES,
  payload: game,
});
export const removeFromFavorites = (id) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: id,
});
export const addComments = (gameComment) => ({
  type: ADD_COMMENT,
  payload: gameComment,
});
export const logout = () => async dispatch => {
  try {
    const response = await axios.put('/user/logout');
    dispatch({
      type: LOGOUT
    });
    console.log('Llenado de deslogueo completo')
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
  }
};
export const deleteItemCart = (UserId) => {
  return {
    type: DELETE_ITEM_CART,
    payload: UserId,
  };
}

export const addPurchades = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ADD_NEWS_PURCHASED,
        payload
      });
    } catch (error) {
      console.log(error.message)
      
    }
  };
};

export const addToCart = (item) => {
  return (dispatch)=> {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart,item ];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
          dispatch({
        type: ADD_TO_CART,
        payload: item
      });
     };
};
export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id
  };
}
export function GetUser(){
  return async function(dispatch){
   try {
    const {data}= await axios.get('http://localhost:3001/user')
    return dispatch({
      type:GET_USER,
      payload:data
    })
   } catch (error) {
    console.log(error.message)
   }
  }
}


