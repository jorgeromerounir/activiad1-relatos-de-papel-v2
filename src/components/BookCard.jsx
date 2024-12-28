import './BookCard.css';
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  const truncateTitle = function (title) {
    if (title.length > 20) {
      return title.substring(0, 25) + '...';
    } else {
      return title;
    }
  };

  return (
    <>
      <Link to={`/book-detail/${book.id}`}>
        <div className='book-card'>
          <img
            className='book-card__img'
            src='/src/assets/book-img.png'
            alt='Book Cover'
          />
          <h3 className='book-card__title'>{truncateTitle(book.title)}</h3>
          <p className='book-card__text'>Id: {book.id}</p>
          <p className='book-card__text'>Author: {book.author}</p>
          <p className='book-card__text'>Genre: {book.genre}</p>
          <p className='book-card__text'>Published: {book.published}</p>
        </div>
      </Link>
    </>
  );
}

export default BookCard;
