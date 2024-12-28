import useDataFromAssetsPromise from './useDataFromAssetsPromise.jsx';

function useGetBookList() {
  const resultPromise = new Promise((resolve, reject) => {
    const booksPromise = useDataFromAssetsPromise('updated_books_long_summary.json');
    booksPromise
      .then((result) => {
        if (result && Array.isArray(result.books)) {
          resolve(result.books);
        } else {
          reject(new Error(`Error format trying to get book list`));
        }
      })
      .catch((error) => {
        reject(new Error(`Error trying to get book list`));
      });
  });
  return resultPromise;
}

export default useGetBookList;
