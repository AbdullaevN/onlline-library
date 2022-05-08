export const CalcSubPrice = (product) => {
  return product.count * product.book.price;
};
export const calcTotalPrice = (cart) => {
  let sum = 0;
  cart.books.forEach((item) => {
    sum += item.subPrice;
  });
  return sum;
};
