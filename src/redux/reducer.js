import { GET_GAMES, GET_GAME_NAME, GET_GAME_ID, 
         GET_PLATFORMS, GET_GENRES, SET_SELECTED_GENRE,
         SET_SELECTED_PLATFORM, SET_AUTHENTICATED, SET_USER_DATA, RESET_FILTERS,
         FILTER_GAMES, RESET_GENRE_FILTER, RESET_PLATFORM_FILTER,
         SORT_GAMES_ASC, SORT_GAMES_DESC, FILTER_GAMES_BY_PRICE, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES,
         ADD_COMMENT, DELETE_ITEM_CART, ADD_NEWS_PURCHASED, ADD_TO_CART, DELETE_ITEM,
         LOGOUT, GET_USER, SET_SELECTED_PRICE, PURCHASE_SUCCESS } from './actions.js';
                        
const initialState = {
  games:[],
  allGames:[],
  gameId: [],
  gameFilter: [],
  platforms:[],
  genres:[],
  selectedGenre: "",
  selectedPlatform: "",
  sortDirection: 'asc',
  // sortDirection: 'desc',
  sortOrder:'',
  isAuthenticated: false,
  userData: null,
  favorites: [],
  reviews:[],
  shoppingCart: [],
  user:[],
  selectedPrice: "",
  cartItemCount: 0,
  purchasedVideogames: []
  }  
 
 const rootReducer = (state=initialState, action)=> {
  let allGamesFav, allGamesRemove, allComments, filtrado; 
  
  switch (action.type) {
    case GET_GAMES:
     return {
      ...state,
      games: action.payload,
      allGames: action.payload
      };
    case GET_GAME_NAME:
      return {
      ...state,
      games: action.payload
      };
    case GET_GAME_ID:
       return {
      ...state,
      gameId: action.payload,
      };
    case GET_PLATFORMS:
      return {
      ...state,
      platforms: action.payload
      };  
    case GET_GENRES:
      return {
      ...state,
      genres: action.payload
        };
    case SET_SELECTED_GENRE:
      return {
      ...state,
      selectedGenre: action.payload,
      };
    case SET_SELECTED_PLATFORM:
      return {
      ...state,
      selectedPlatform: action.payload,
      };
    case SET_SELECTED_PRICE:
      return {
        ...state,
        selectedPrice: action.payload,
      };
    case FILTER_GAMES:
      return {
      ...state,
      games: action.payload
      };
    case SORT_GAMES_ASC:
      return {
      ...state,
      games: [...state.games].sort((a, b) => a.name.localeCompare(b.name)),
      };

    case SORT_GAMES_DESC:
      return {
      ...state,
      games: [...state.games].sort((a, b) => b.name.localeCompare(a.name)),
      };
    case FILTER_GAMES_BY_PRICE:
      return {
      ...state,
      games: state.allGames
              .filter(game => game.price <= action.payload)
              .sort((a, b) => b.price - a.price)
          };
    case RESET_FILTERS:
      return {
              ...state,
              selectedGenre: "",
              selectedPlatform: "",
              games: [...state.allGames],
              sortOrder: initialState.sortOrder 
            };
    case RESET_PLATFORM_FILTER:
      return {
              ...state,
              selectedPlatform: "",
              games: [...state.allGames], 
            };
    case RESET_GENRE_FILTER:
      return {
              ...state,
              selectedGenre: "",
              games: [...state.allGames]
              , 
            };
    case SET_AUTHENTICATED:
      return {
              ...state,
              isAuthenticated: action.payload,
            };
    case SET_USER_DATA:
      return {
                ...state,
                userData: action.payload,
              };

    case ADD_TO_FAVORITES:
            allGamesFav = [...state.favorites, action.payload];
            console.log("Add:",allGamesFav)
      return {
                ...state,
                favorites: allGamesFav,
            };
    case REMOVE_FROM_FAVORITES:
            allGamesRemove = state.favorites.filter(game => game.id !== action.payload);
              console.log("Remove:",allGamesRemove)
        return {
                ...state,
                favorites: allGamesRemove 
            };
    case ADD_COMMENT:
         allComments = [...state.reviews, action.payload];
              console.log(allComments)
              return {
                ...state,
                reviews: allComments
              }
      case LOGOUT:
              return {
                ...state,
                favorites,
                reviews,
              };
    case DELETE_ITEM_CART:
      
      return {
        ...state,
        shoppingCart:[],
        cartItemCount: 0,
      };
    case ADD_NEWS_PURCHASED:
      return{
        ...state,
        userData: {
          
          purchased: [...state.userData.purchased, ...action.payload]
        }
      }
    case ADD_TO_CART:
         
       return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload],
        cartItemCount: state.cartItemCount +1,
      }
                
    case DELETE_ITEM:
      filtrado = state.shoppingCart.filter((el) => el.id !== action.payload);
      return{
        ...state,
        shoppingCart: filtrado,
        cartItemCount: state.cartItemCount -1,
      }
      case GET_USER:
        return{
          ...state,
          user:action.payload
        } 
      case PURCHASE_SUCCESS:
        return{
          ...state,
          purchasedVideogames:[...state.purchasedVideogames, action.payload]
        } 
    default:
      return {...state}  
  }

 }

 export default rootReducer;