
export const getUserDetails = () => ({
  type: 'USER_DETAILS_LOADING',
});

export const getUserDetailsSuccess = data => ({
  type: 'USER_DETAILS_SUCCESS',
  data,
});

export const getUserDetailsError = error => ({
  type: 'USER_DETAILS_ERROR',
  error,
});
