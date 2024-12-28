import LocalStorageUtil from '../util/LocalStorageUtil';
import configApp from '../config/ConfigApp';

function useShoppingCardGetLastOrder() {
  const resultPromise = new Promise((resolve, reject) => {
    const storage = new LocalStorageUtil(configApp.storageShoppingCartKey);
    const dataList = storage.getItem();
    if (Array.isArray(dataList)) {
      if (dataList.length === 0) {
        resolve(null);
      } else {
        resolve(dataList[dataList.length - 1]);
      }
    } else {
      reject(new Error('Error trying to get last order from card list'));
    }
  });
  return resultPromise;
}

export default useShoppingCardGetLastOrder;
