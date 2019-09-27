const initialState = {
  data: [],
  loading: false,
  error: false,
};
  /**
   Store the data for the cart and its details
   */
export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_DETAILS_LOADING':
      return {
        ...state,
        loading: true,
        data: [],
        error: false,
      };
    case 'USER_DETAILS_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.data,
        error: false,
      };
    case 'USER_DETAILS_ERROR':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
