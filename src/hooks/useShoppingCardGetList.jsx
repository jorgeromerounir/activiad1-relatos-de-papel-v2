import LocalStorageUtil from '../util/LocalStorageUtil';
import configApp from '../config/ConfigApp';

function useShoppingCardGetList() {
  const resultPromise = new Promise((resolve, reject) => {
      const storage = new LocalStorageUtil(configApp.storageShoppingCartKey);
      const dataList = storage.getItem();
      if (Array.isArray(dataList)) {
        resolve(dataList);
      } else {
        reject(new Error('Error trying to get shopping card list'));
      }
  });
  return resultPromise;
}

export default useShoppingCardGetList;
