import axios from "axios";
import { instance } from "redux/axiosConfig";
import * as types from "./actionsType";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDeleted = () => ({
  type: types.DELETE_USER,
});
const userAdded = () => ({
  type: types.ADD_USER,
});
const userUpdated = () => ({
  type: types.UPDATE_USER,
});
const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});

export const clearCountOfCart = () => {
  return async (dispatch) => {
    dispatch({
      type: types.CLEAR_COUNT_OF_CART,
      payload: null,
    });
  };
};
//
export const loadUsers = () => {
  return function (dispatch) {
    instance
      .get("/users")
      .then((resp) => {
        console.log("resp", resp.data);
        dispatch(getUsers(resp.data));
      })
      .catch((e) => console.log(e));
  };
};
export const deleteUsers = (id) => {
  return function (dispatch) {
    instance
      .delete(`/users/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userDeleted());
        dispatch(loadUsers());
      })
      .catch((e) => console.log(e));
  };
};
export const addUsers = (user) => {
  return function (dispatch) {
    instance
      .post(`/users`, user)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userAdded());
        dispatch(loadUsers());
      })
      .catch((e) => console.log(e));
  };
};

export const getSingleUser = (id) => {
  return function (dispatch) {
    instance
      .get(`/users/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getUser(resp.data));
      })
      .catch((e) => console.log(e));
  };
};
export const updateUser = (user, id) => {
  return function (dispatch) {
    instance
      .put(`/users/${id}`, user)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userUpdated());
      })
      .catch((e) => console.log(e));
  };
};
