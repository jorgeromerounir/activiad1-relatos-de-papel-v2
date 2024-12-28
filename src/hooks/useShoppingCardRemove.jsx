import LocalStorageUtil from '../util/LocalStorageUtil';
import configApp from '../config/ConfigApp';

function useShoppingCardRemove(orderId) {
  const resultPromise = new Promise((resolve, reject) => {
    try {
      const storage = new LocalStorageUtil(configApp.storageShoppingCartKey);
      storage.removeItem(orderId);
      resolve(orderId);
    } catch (err) {
      console.log(err);
      reject(new Error('Error tying to remove an order to shopping card'));
    }
  });
  return resultPromise;
}

export default useShoppingCardRemove;
