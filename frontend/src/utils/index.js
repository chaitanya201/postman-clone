export const safeParse = (body) => {
  try {
    return JSON.parse(body);
  } catch (error) {
    return {};
  }
};
