import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutSummary.css';
import useShoppingCardGetList from '../hooks/useShoppingCardGetList.jsx';
import useShoppingCardClear from '../hooks/useShoppingCardClear.jsx';
import SimpleLoader from './SimpleLoader.jsx';
import HomeContainer from './HomeContainer.jsx';
import useFormatPrice from '../hooks/useFormatPrice.jsx';

function CheckoutSummary() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cardList, setCardList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoadingPay, setIsLoadingPay] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  useEffect(() => {
    const cardListPromise = useShoppingCardGetList();
    cardListPromise
      .then((orderList) => {
        setTotalPrice(calcTotal(orderList));
        setCardList(orderList);
      })
      .catch((err) => {
        console.log('Error: ', err);
        setErrorMsg('Error trying to get card items list');
      })
      .finally(() => {
        console.log('Finally');
        setIsLoading(false);
      });
  }, []);

  const calcPrice = (numBooks, price) => {
    return numBooks * price;
  };

  const navigate = useNavigate();

  const calcTotal = (orderList) => {
    console.log('orderList: ', orderList);
    let total = 0;
    orderList.map((item) => {
      console.log(item);
      total = total + calcPrice(item.numOfBooks, item.bookData.price);
    });
    return total;
  };

  const payConfirmation = () => {
    setIsLoadingPay(true);
    const timerId = setTimeout(() => {
      setShowModalConfirm(true);
      const timerId2 = setTimeout(() => {
        setIsLoadingPay(false);
        useShoppingCardClear();
        navigate('/home-book-list');
      }, 5000);
      return () => clearTimeout(timerId2);
    }, 5000);
    return () => clearTimeout(timerId);
  };

  return (
    <>
      <HomeContainer>
        <div className='checkout-summary'>
          <h2>Resumen de compra</h2>
          {isLoading ? (
            <SimpleLoader>Cargando...</SimpleLoader>
          ) : errorMsg ? (
            <div className='error-container'>{errorMsg}</div>
          ) : (
            <>
              <table className='checkout-summary__table'>
                <tbody>
                  <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                  {cardList &&
                    cardList.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          {index + 1} - {item.bookData.title}
                        </td>
                        <td>{item.numOfBooks} <strong>{'  x  '}</strong> {useFormatPrice(item.bookData.price)}</td>
                        <td>
                          {useFormatPrice(
                            calcPrice(item.numOfBooks, item.bookData.price)
                          )}
                        </td>
                      </tr>
                    ))}
                  <tr className='total-row'>
                    <td colSpan='2'>Total:</td>
                    <td>{useFormatPrice(totalPrice)}</td>
                  </tr>
                </tbody>
              </table>
              <br></br>
              {isLoadingPay ? (
                <SimpleLoader>Procesando tu pago...</SimpleLoader>
              ) : (
                <button
                  className='book-detail__pay'
                  onClick={(e) => payConfirmation()}
                >
                  {' '}
                  Confirmar{' '}
                </button>
              )}
            </>
          )}
        {showModalConfirm && (
          <div className='checkout-summary__modal'>
            <div className='checkout-summary__modal-content'>
              <h2>Tu pago ha sido realizado!</h2>
              <SimpleLoader>Redireccionando...</SimpleLoader>
            </div>
          </div>
        )}
        </div>
        <br></br>
      </HomeContainer>
    </>
  );
}

export default CheckoutSummary;
