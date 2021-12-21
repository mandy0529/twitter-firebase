import {useState} from 'react';
import {useEffect} from 'react/cjs/react.development';
import {useProductsContext} from '../context/ProductsContext';
import {db, timestamp, storage} from '../firebase';

function useStorage(file) {
  const {valueContent} = useProductsContext();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [url] = useState('');

  const handleStorage = () => {
    if (file) {
      const imgStorage = storage.ref(file.name);
      const collectionRef = db.collection('images');
      imgStorage.put(file).on(
        'state_changed',
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          setError(error);
        },
        async () => {
          const url = await imgStorage.getDownloadURL();
          const createdAt = timestamp();
          const formObj = {
            title: valueContent.title,
            category: valueContent.category,
            price: valueContent.price,
            text: valueContent.text,
          };
          collectionRef.add({
            url,
            createdAt,
            title: formObj.title,
            category: formObj.category,
            price: formObj.price,
            text: formObj.text,
          });
        }
      );
    }
  };

  useEffect(() => {
    handleStorage();
    return () => handleStorage();
    // eslint-disable-next-line
  }, []);

  return {progress, error, url};
}

export default useStorage;
