import { useState } from 'react';

const ExpProductImageController = () => {
  const [isShare, setIsShare] = useState<boolean>(false);

  const printProduct = () => {
    window.print();
    return false;
  };

  return {
    setIsShare,
    isShare,
    printProduct,
  };
};

export default ExpProductImageController;
