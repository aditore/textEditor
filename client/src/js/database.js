import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('PUT in the database');

  //connection to databse plus version
  const valueDb = await openDB('jate', 1);
  //new transaction to and specify privileges
  const value = valueDb.transaction('jate', 'readwrite');
  //open the object store
  const store = value.objectStore('jate');
  //update database
  const req = store.put({ value: content });
  //confirm request
  const res = await req;
  console.log('Data saved to DB', res);
  return res; 
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  //connection to database plus version
  const valueDb = await openDB('jate', 1);
  //new transaction to and specify privileges
  const value = valueDb.transaction('jate', 'readonly');
  //open the object store
  const store = value.objectStore('jate');
  //get all data
  const req = await store.getAll();
  //confirm request
  const res = await req;
  console.log('res.value', res);
  //grab the value and not the whole object
  return res.value;
}
initdb();
