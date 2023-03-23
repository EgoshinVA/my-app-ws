export const requiredField = (value) => {
  if (value) return undefined;
  return 'FIeld id required';
};

export const maxLengthCreator = (maxLength) => (value) => {
  if (value && value.length > maxLength) return `Max length is ${maxLength}`;
  return undefined;
};
