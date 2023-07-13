const addDecimals = (num: number) => {
  return parseFloat((Math.round(num * 100) / 100).toFixed());
};
export default addDecimals;
