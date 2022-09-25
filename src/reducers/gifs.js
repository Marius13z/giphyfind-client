export const initialState = {
  loading: false,
  gifs: {},
  gifsNumber: 10,
  dbGifs: {},
};

export const gifsReducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_GIFS":
      return {
        ...state,
        gifs: payload,
      };
    case "FETCH_STOP":
      return {
        ...state,
        loading: false,
      };
    case "LOAD_MORE":
      return {
        ...state,
        gifsNumber: state.gifsNumber + 10,
      };
    case "FETCH_GIFS_BY_ID":
      return {
        ...state,
        dbGifs: payload,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};
