import React, { useState, useEffect } from 'react';

const ExpAutoCompleteTextBox: React.FC<any> = () => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      // call auto-complete api
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <div>
      <input
        type="text"
        list="auto-complete-options"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <datalist id="auto-complete-options">
        {/* map over array of suggessions */}
      </datalist>
    </div>
  );
};

const expAutoCompleteTextBox = {
  traitName: 'auto-complete-text-box',
  component: ExpAutoCompleteTextBox,
};

export default expAutoCompleteTextBox;
