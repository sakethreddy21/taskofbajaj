import React, { useState } from 'react';
import usePostData from '../hooks/usePostData';

interface JSONInputFormProps {
  onSubmit: (data: any) => void;
}

const JSONInputForm: React.FC<JSONInputFormProps> = ({ onSubmit }) => {
  const [jsonInput, setJsonInput] = useState('');
  const { data, error, loading, postData } = usePostData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput);
      await postData(parsedData);
      // Ensure onSubmit is called after postData has completed
      if (data) {
        onSubmit(data);
      }
    } catch (e) {
      // Handle JSON parsing error
      console.error('Error parsing JSON:', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col'>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows={10}
          cols={50}
          placeholder="Enter JSON data here..."
          className='text-black'
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default JSONInputForm;
