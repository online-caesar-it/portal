const telephoneInputMask = (value: string) => {
  let cleanValue = value.replace(/\D/g, "");

  if (cleanValue.length > 11) {
    cleanValue = cleanValue.slice(0, 11);
  }

  if (cleanValue.length <= 1) {
    cleanValue = `+7${cleanValue}`;
  } else if (cleanValue.length <= 4) {
    cleanValue = `+7 (${cleanValue.slice(1)}`;
  } else if (cleanValue.length <= 7) {
    cleanValue = `+7 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(4)}`;
  } else {
    cleanValue = `+7 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(
      4,
      7
    )}-${cleanValue.slice(7, 9)}-${cleanValue.slice(9, 11)}`;
  }

  return cleanValue;
};
export const input = {
  telephoneInputMask,
};
