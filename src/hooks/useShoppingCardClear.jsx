import LocalStorageUtil from '../util/LocalStorageUtil';
import configApp from '../config/ConfigApp';

function useShoppingCardClear() {
  const resultPromise = new Promise((resolve, reject) => {
    try {
      const storage = new LocalStorageUtil(configApp.storageShoppingCartKey);
      storage.clear();
      resolve();
    } catch (err) {
      console.log(err);
      reject(new Error('Error tying to clear all orders from shopping card'));
    }
  });
  return resultPromise;
}

export default useShoppingCardClear;
