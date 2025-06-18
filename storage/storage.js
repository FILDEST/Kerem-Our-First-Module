import { v4 as uuidv4 } from 'uuid';

function isMatch(item, whereObj) {
  return Object.entries(whereObj).every(
    ([key, value]) => item[key] === value
  );
}



export class InMemoryStorage {
  constructor() {
    this.data = {};
  }

  create(collectionName, item) {
    if (!this.data[collectionName]) {
      this.data[collectionName] = [];
    }
    const newItem = { ...item, _id: uuidv4() };
    this.data[collectionName].push(newItem);
    return newItem;
  }

  find(collectionName, findFunc) {
    if (!this.data[collectionName]) return [];
    return this.data[collectionName].filter(findFunc);
  }

  where(collectionName, whereObj) {
    if (!this.data[collectionName]) return [];
    return this.data[collectionName].filter(item => isMatch(item, whereObj));
  }

  remove(collectionName, findFunc) {
    if (!this.data[collectionName]) return [];
    const removedItems = [];
    this.data[collectionName] = this.data[collectionName].filter(item => {
      if (findFunc(item)) {
        removedItems.push(item);
        return false;
      }
      return true;
    });
    return removedItems;
  }
}


export class InMemorySharedStorage {
  static sharedData = {};

  create(collectionName, item) {
    if (!InMemorySharedStorage.sharedData[collectionName]) {
      InMemorySharedStorage.sharedData[collectionName] = [];
    }
    const newItem = { ...item, _id: uuidv4() };
    InMemorySharedStorage.sharedData[collectionName].push(newItem);
    return newItem;
  }

  find(collectionName, findFunc) {
    if (!InMemorySharedStorage.sharedData[collectionName]) return [];
    return InMemorySharedStorage.sharedData[collectionName].filter(findFunc);
  }

  where(collectionName, whereObj) {
    if (!InMemorySharedStorage.sharedData[collectionName]) return [];
    return InMemorySharedStorage.sharedData[collectionName].filter(item =>
      isMatch(item, whereObj)
    );
  }

  remove(collectionName, findFunc) {
    if (!InMemorySharedStorage.sharedData[collectionName]) return [];
    const removedItems = [];
    InMemorySharedStorage.sharedData[collectionName] =
      InMemorySharedStorage.sharedData[collectionName].filter(item => {
        if (findFunc(item)) {
          removedItems.push(item);
          return false;
        }
        return true;
      });
    return removedItems;
  }
}
