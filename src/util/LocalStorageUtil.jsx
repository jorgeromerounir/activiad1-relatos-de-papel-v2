class LocalStorageUtil {
    constructor(key) {
      this.key = key;
    }
  
    getItem() {
      try {
        const item = localStorage.getItem(this.key);
        return item ? JSON.parse(item) : []; 
      } catch (error) {
        console.error(`Error getting item from localStorage: ${error}`);
        return []; 
      }
    }
  
    setItem(value) {
      try {
        localStorage.setItem(this.key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting item in localStorage: ${error}`);
      }
    }
  
    addItem(item) {
      const currentItems = this.getItem();
      currentItems.push(item);
      this.setItem(currentItems);
    }
  
    removeItem(id) {
      const currentItems = this.getItem();
      const filteredItems = currentItems.filter((item) => item.id !== id); 
      this.setItem(filteredItems);
    }
  
    updateItem(id, updatedItem) {
      const currentItems = this.getItem();
      const updatedItems = currentItems.map((item) => 
        item.id === id ? updatedItem : item
      );
      this.setItem(updatedItems);
    }
  
    clear() {
      localStorage.removeItem(this.key);
    }
  }
  
  export default LocalStorageUtil;