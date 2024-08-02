import React from 'react';

interface DropdownMenuProps {
  data: {
    alphabets: string[];
    numbers: number[];
    highest_alphabet: string[];
  };
  visibility: string[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ data, visibility }) => {
  if (!data) return null;

  return (
    <div>
      {visibility.includes('Characters') && data.alphabets.length > 0 && (
        <section>
          <h3>Characters</h3>
          <ul>
            {data.alphabets.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </section>
      )}

      {visibility.includes('Numbers') && data.numbers.length > 0 && (
        <section>
          <h3>Numbers</h3>
          <ul>
            {data.numbers.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </section>
      )}

      {visibility.includes('Highest alphabet') && data.highest_alphabet.length > 0 && (
        <section>
          <h3>Highest Alphabet</h3>
          <ul>
            {data.highest_alphabet.map((alpha, index) => (
              <li key={index}>{alpha}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default DropdownMenu;
