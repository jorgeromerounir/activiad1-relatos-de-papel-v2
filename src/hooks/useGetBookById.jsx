import useDataFromAssetsPromise from './useDataFromAssetsPromise.jsx';

function useGetBookById(bookId) {
  const resultPromise = new Promise((resolve, reject) => {
    const booksPromise = useDataFromAssetsPromise('updated_books_long_summary.json');
    booksPromise
      .then((result) => {
        if(result && Array.isArray(result.books)){
            const foundBook = result.books.find((item) => item.id == bookId);
            resolve(foundBook ? foundBook : null);
        } else {
            reject(new Error(`Error format result trying to get book with id ${bookId}`));
        }
      })
      .catch((error) => {
        reject(new Error(`Error trying to get book with id ${bookId}`));
      });
  });
  return resultPromise;
}

export default useGetBookById;
