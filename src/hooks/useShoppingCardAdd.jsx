import LocalStorageUtil from '../util/LocalStorageUtil';
import configApp from '../config/ConfigApp';

function useShoppingCardAdd(orderItem) {
  const resultPromise = new Promise((resolve, reject) => {
    try {
      const storage = new LocalStorageUtil(configApp.storageShoppingCartKey);
      storage.addItem(orderItem);
      resolve(orderItem);
    } catch (err) {
      reject(new Error('Error tying to add an order to shopping card'));
    }
  });
  return resultPromise;
}

export default useShoppingCardAdd;
