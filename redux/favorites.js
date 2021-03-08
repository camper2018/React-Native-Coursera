import * as ActionTypes from "./ActionTypes";
// REDUCER
export const favorites = (state = [], action) => {
  // So if the dishes already in the favorites, then I don't need to change the state at all,
  // because the favorites remain the same.
  // If not, then this is a new disc that I need to add to the favorites,
  // so I concatenate that into my favorites array, and then send it back.
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      if (state.some((el) => el === action.payload)) {
        return state;
      } else {
        return state.concat(action.payload);
      }
    default:
      return state;
  }
};
