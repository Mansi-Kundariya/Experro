import React, { useEffect } from 'react';

const ExpDynamicDropdown: React.FC = () => {

  useEffect(() => {
   // call select list api
  }, []);

  return (
    <div>
      <select>
          {/* map over options got form api */}
      </select>
    </div>
  );
};

const expDynamicDropdown = {
  traitName: 'dynamic-dropdown',
  component: ExpDynamicDropdown,
};

export default expDynamicDropdown;
