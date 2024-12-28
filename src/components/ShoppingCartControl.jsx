import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingCartControl.css';
import useShoppingCardGetList from '../hooks/useShoppingCardGetList.jsx';
import useShoppingCardRemove from '../hooks/useShoppingCardRemove.jsx';
import SimpleLoader from './SimpleLoader.jsx';
import useFormatPrice from '../hooks/useFormatPrice.jsx';

function ShoppingCartControl() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cardList, setCardList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const updateCartData = () => {
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
  };

  const calcPrice = (numBooks, price) => {
    return numBooks * price;
  };

  const calcTotal = (orderList) => {
    console.log('orderList: ', orderList);
    let total = 0;
    orderList.map((item) => {
      console.log(item);
      total = total + calcPrice(item.numOfBooks, item.bookData.price);
    });
    return total;
  };

  const handleOpenModal = () => {
    setShowModal(true);
    updateCartData();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const removeItemFromCart = (item) => {
    console.log('item to remove: ', item);
    useShoppingCardRemove(item.id);
    updateCartData();
  };

  const payAndGotoCheckout = () => {
    handleCloseModal();
    navigate('/checkout');
  };

  return (
    <>
      <div className='shopping-card'>
        <button className='shopping-card__btn' onClick={handleOpenModal}>Mi carrito de compra</button>
        {showModal && (
          <div className='shopping-card__modal'>
            <div className='shopping-card__modal-content'>
              <span className='shopping-card__close' onClick={handleCloseModal}>
                &times;
              </span>
              <h2>Mi Carrito de compras</h2>
              {isLoading ? (
                <SimpleLoader>Cargando...</SimpleLoader>
              ) : errorMsg ? (
                <div className='error-container'>{errorMsg}</div>
              ) : (
                <>
                  <table className='shopping-card__table'>
                    <tbody>
                      <tr>
                        <th>Item</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Acción</th>
                      </tr>
                      {cardList &&
                        cardList.map((item, index) => (
                          <tr key={item.id}>
                            <td>
                              {index + 1} - {item.bookData.title}
                            </td>
                            <td>{item.numOfBooks} <strong>x</strong> {useFormatPrice(item.bookData.price)}</td>
                            <td>
                              {useFormatPrice(
                                calcPrice(item.numOfBooks, item.bookData.price)
                              )}
                            </td>
                            <td>
                              <button className='book-detail__remove' onClick={(e) => removeItemFromCart(item)}>
                                Remover
                              </button>
                            </td>
                          </tr>
                        ))}
                      <tr className='total-row'>
                        <td colSpan='2'>Total:</td>
                        <td>{useFormatPrice(totalPrice)}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <br></br>
                  <button
                    className='book-detail__pay'
                    onClick={(e) => payAndGotoCheckout()}
                  >Pagar</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ShoppingCartControl;
