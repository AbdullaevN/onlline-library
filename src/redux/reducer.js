import * as types from "./actionsType";

const initialState = {
  users: [],
  user: {},
  loading: true,
  cart: null,
  productsCountInCart: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).books.length
    : 0,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return { ...state, users: action.payload, loading: false };
    case types.DELETE_USER:
    case types.ADD_USER:
    case types.UPDATE_USER:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_USER:
      return { ...state, user: action.payload, loading: false };

    case types.ADD_AND_DELETE_CART:
      return { ...state, productsCountInCart: action.payload };
    case types.GET_CART:
      return { ...state, cart: action.payload };
    case types.CLEAR_COUNT_OF_CART:
      return { ...state, productsCountInCart: action.payload };

    default:
      return state;
  }
};

export default usersReducers;
