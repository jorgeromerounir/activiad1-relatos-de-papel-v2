import { useState } from 'react';
import useGetBookList from '../hooks/useGetBookList.jsx';
import HomeContainer from './HomeContainer.jsx';
import SimpleLoader from './SimpleLoader.jsx';
import BookCard from './BookCard.jsx';
import './HomeBookList.css';

function HomeBookList() {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [bookList, setBookList] = useState([]);

  const booksPromise = useGetBookList();
  booksPromise
    .then((books) => {
      setBookList(books);
    })
    .catch((error) => {
      console.log(error);
      setErrorMsg(`Error trying to get book list.`);
    })
    .finally(() => {
      setIsLoading(false);
    });

  const handleSearchChange = (value) => {
    setSearchValue(value.toLowerCase());
  };

  const filteredBooks = bookList.filter((book) =>
    book.title.toLowerCase().includes(searchValue)
  );

  return (
    <>
      <HomeContainer>
          <div className='book-list'>
            <br></br>
            <h2 className='book-list__title'>Busca tu libro favorito!</h2>
            <input
              type='text'
              className='book-list__input-search'
              placeholder='Busca por título'
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <br></br>
            <br></br>
            <div className='book-list__container'>
              {isLoading ? (
                <SimpleLoader>Cargando...</SimpleLoader>
              ) : errorMsg ? (
                <div className='error-container'>{errorMsg}</div>
              ) : (
                filteredBooks &&
                filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book}></BookCard>
                ))
              )}
            </div>
          </div>
      </HomeContainer>
    </>
  );
}

export default HomeBookList;
