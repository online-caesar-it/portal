const validateEmail = (value: string) => {
  return /^\S+@\S+\.\S+$/.test(value);
};
export const validators = {
  validateEmail,
};
