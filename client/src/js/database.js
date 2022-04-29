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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT in the database');

  //connection to databse plus version
  const textDb = await openDB('jate', 1);
  //new transaction to and specify privileges
  const text = textDb.transaction('jate', 'readwrite');
  //open the object store
  const store = text.objectStore('jate');
  //update database
  const req = store.put({ text: content });
  //confirm request
  const res = await req;
  console.log('Data saved to DB', res);
  return res; 
}

// TODO: Add logic for a method that gets all the content from the database -complete
export const getDb = async () => {
  console.log('GET from the database');

  //connection to database plus version
  const textDb = await openDB('jate', 1);
  //new transaction to and specify privileges
  const text = textDb.transaction('jate', 'readonly');
  //open the object store
  const store = text.objectStore('jate');
  //get all data
  const req = store.getAll();
  //confirm request
  const res = await req;
  console.log('res.value', res);
  return res;
}
initdb();
