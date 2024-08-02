"use client"
import React, { useEffect, useState } from 'react';
import JSONInputForm from '@/components/JSONInputForm';
import DropdownMenu from '@/components/DropdownMenu';
import VisibilitySelector from '@/components/VisibilitySelector';

const Home: React.FC = () => {
  const [responseData, setResponseData] = useState<any>(null);
  const [visibility, setVisibility] = useState<string[]>([]);

  const handleFormSubmit = (data: any) => {
    setResponseData(data);
  };

  useEffect(() => {
    console.log(responseData)
  }, [responseData]);
  return (
    <div>
      <h1>JSON Input and API Response Display</h1>
      <JSONInputForm onSubmit={handleFormSubmit} />
      {responseData && (
        <>
          <VisibilitySelector onChange={(selected: string[]) => setVisibility(selected)} />
          <DropdownMenu data={responseData} visibility={visibility} />
        </>
      )}
    </div>
  );
};

export default Home;
