import { useState } from 'react';
import axios from 'axios';

const usePostData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (payload:any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/bfhl', payload);
      setData(response.data);
    } catch (err:any) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData };
};

export default usePostData;
