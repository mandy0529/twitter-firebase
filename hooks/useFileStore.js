import {useEffect, useState} from 'react';
import {db} from '../firebase';

function useFirestore(data) {
  const [images, setImages] = useState([]);

  const handleCollection = () => {
    if (data) {
      db.collection(data)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snap) => {
          let documents = [];
          snap.forEach((doc) => {
            documents.push({...doc.data(), id: doc.id});
          });
          setImages(documents);
        });
    }
  };

  useEffect(() => {
    handleCollection();
    return () => handleCollection();
  }, [data]);

  return {images};
}

export default useFirestore;
