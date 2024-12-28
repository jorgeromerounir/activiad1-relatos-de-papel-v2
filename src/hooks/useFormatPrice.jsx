
const useFormatPrice = (price) => {
  let formatPrice = '';
  if (price !== undefined && price !== null) {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    });
    formatPrice = formatter.format(price);
  } else {
    formatPrice = '';
  }
  return formatPrice;
};

export default useFormatPrice;
