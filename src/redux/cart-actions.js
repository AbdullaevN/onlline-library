import { CalcSubPrice, calcTotalPrice } from "../utils/calcPrice";
import {
  ADD_AND_DELETE_CART,
  CLEAR_COUNT_OF_CART,
  GET_CART,
} from "./actionsType";
// ! cart
export const addAndDeleteProductInCart = (product1) => {
  return (dispatch) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        books: [],
        totalPrice: 0,
      };
    }
    let product = {
      book: product1,
      count: 1,
      subPrice: 0,
    };
    product.subPrice = CalcSubPrice(product);
    let checkArr = cart.books.filter((item) => {
      return item.book.id === product1.id;
    });
    if (checkArr.length === 0) {
      cart.books.push(product);
    } else {
      cart.books = cart.books.filter((item) => {
        return item.book.id !== product1.id;
      });
    }
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ADD_AND_DELETE_CART,
      payload: cart.books.length,
    });
  };
};
export const checkProductInCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = {
      books: [],
      totalPrice: 0,
    };
  }
  let checkArr = cart.books.filter((item) => {
    return item.book.id === id;
  });
  if (checkArr.length === 0) {
    return false;
  } else {
    return true;
  }
};
export const getCart = () => {
  return (dispatch) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    dispatch({
      type: GET_CART,
      payload: cart,
    });
  };
};
export const changeCountProduct = (count, id) => {
  return (dispatch) => {
    if (count < 1) {
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        books: [],
        totalPrice: 0,
      };
    }
    cart.books = cart.books.map((item) => {
      if (item.book.id === id) {
        item.count = count;
        item.subPrice = CalcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch(getCart());
  };
};
// Clear count of cart
export const clearCountOfCart = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_COUNT_OF_CART,
      payload: null,
    });
  };
};
