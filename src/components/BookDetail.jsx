import { useState } from 'react';
import { useEffect } from 'react';
import './BookDetail.css';
import useGetBookById from '../hooks/useGetBookById.jsx';
import useFormatPrice from '../hooks/useFormatPrice.jsx';
import useShoppingCardAdd from '../hooks/useShoppingCardAdd.jsx';
import useShoppingCardGetLastOrder from '../hooks/useShoppingCardGetLastOrder.jsx';
import HomeContainer from './HomeContainer.jsx';
import SimpleLoader from './SimpleLoader.jsx';
import { useParams } from 'react-router-dom';

function BookDetail() {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [numBooks, setNumBooks] = useState(1);

  const bookPromise = useGetBookById(bookId);
  bookPromise
    .then((bookResult) => {
      setBookData(bookResult);
    })
    .catch((error) => {
      setErrorMsg(`Error trying to get the book: ${bookId}`);
    })
    .finally(() => {
      setIsLoading(false);
    });

  const addToShoppingCard = function (numOfBooks, bookData) {
    console.log('addToShoppingCard', numOfBooks, bookData);
    const lastOrderPromise = useShoppingCardGetLastOrder();
    lastOrderPromise.then((lastOrder) => {
      let newId = 1;
      if (lastOrder) {
        newId = lastOrder.id + 1;
      }
      useShoppingCardAdd({
        id: newId,
        creationDate: new Date(),
        numOfBooks: numOfBooks,
        bookData: bookData,
      });
    });
  };

  const updateNumBooks = (value) => {
    setNumBooks(value);
  }

  // ---
  return (
    <>
      <HomeContainer>
        {isLoading ? (
          <SimpleLoader>Cargando...</SimpleLoader>
        ) : errorMsg ? (
          <div className='error-container'>Error tying to get book</div>
        ) : (
          bookData && (
            <div className='book-detail'>
              <div className='book-detail__cont1'>
                <img src='/src/assets/book-img.png' alt='Foto del libro' />
              </div>
              <div className='book-detail__cont2'>
                <h1>{bookData.title}</h1>
                <p>
                  <strong>ID:</strong> {bookData.id}
                </p>
                <p>
                  <strong>Autor:</strong> {bookData.author}
                </p>
                <p>
                  <strong>Género:</strong> {bookData.genre}
                </p>
                <p>
                  <strong>Año:</strong> {bookData.published}
                </p>
                <p>
                  <strong>Precio:</strong> {useFormatPrice(bookData.price)}
                </p>
                <p>
                  <strong>Descripción / Resumen:</strong> {bookData.summary}
                </p>
                <br></br>
                <div className='book-detail__actions'>
                  <input
                    type='number'
                    id='number-of-books'
                    min='1'
                    max='50'
                    onChange={(e) => updateNumBooks(e.target.value)}
                    defaultValue={numBooks}
                  />
                  <button
                    onClick={(e) => addToShoppingCard(numBooks, bookData)}
                  >
                    <i className='fas fa-shopping-cart'></i> Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </HomeContainer>
    </>
  );
}

export default BookDetail;
