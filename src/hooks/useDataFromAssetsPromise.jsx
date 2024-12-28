import { useEffect } from 'react';

function useDataFromAssetsPromise(fileName) {
  const resultPromise = new Promise((resolve, reject) => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/src/assets/${fileName}`);
          if (!response.ok) {
            reject(new Error(`Error load data from ${fileName}`));
            return;
          }
          const jsonData = await response.json();
          if (jsonData) {
            // test error
            //reject(new Error(`Error test from ${fileName}`))
            resolve(jsonData);
          } else {
            resolve({});
          }
        } catch (err) {
          reject(new Error(`Error trying to execute ${fileName}`));
        }
      };
      fetchData();
    }, [fileName]);
  });
  return resultPromise;
}

export default useDataFromAssetsPromise;
