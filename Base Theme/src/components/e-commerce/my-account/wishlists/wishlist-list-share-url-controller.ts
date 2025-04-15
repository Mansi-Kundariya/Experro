import { useEffect } from 'react';
import { toast, useSearchParams } from 'experro-storefront';

const ExpWishlistShareUrlController = () => {
  const [queryParams] = useSearchParams();

  const domain = window.location.host;
  const wishlistId = queryParams.get('id');
  const url = `${domain}/wishlist/?id=${wishlistId}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('URL copied to clipboard!');
      })
      .catch((err) => {
        toast.error('Failed to copy');
        console.error('Failed to copy: ', err);
      });
  };

  useEffect(() => {
    document.getElementById('account')?.classList.add('account-fullwidth');
    return () => {
      document.getElementById('account')?.classList.remove('account-fullwidth');
    };
  }, []);

  return {
    url,
    handleCopy,
  };
};

export default ExpWishlistShareUrlController;
