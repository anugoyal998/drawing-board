import * as actionTypes from "../types";

export const setAction = (action) => {
  return {
    type: actionTypes.SET_ACTION,
    payload: action,
  };
};
