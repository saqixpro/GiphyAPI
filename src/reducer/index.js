import * as actions from "../actions";

const initialState = {
  favorites: [],
  response: [],
  trending: [],
  loading: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SAVE_GIPHY_RESPONSE:
      return { ...state, response: payload };
    case actions.SAVE_TRENDING_GIFS:
      return { ...state, trending: payload };
    case actions.MARK_AS_FAVORITE:
      return { ...state, favorites: [...state.favorites, payload] };
    case actions.UNMARK_AS_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== payload.id),
      };
    case actions.SET_LOADING_STATE:
      return { ...state, loading: payload };
    default:
      return state;
  }
};

export default reducer;
