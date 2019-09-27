
export const getFilteredList = (arr, checkValues) => {
  return arr.filter(ele => checkValues.includes(ele.type.toString()));
};

export const filterByUserType = (arr, checkValues) => getFilteredList(arr, checkValues);
