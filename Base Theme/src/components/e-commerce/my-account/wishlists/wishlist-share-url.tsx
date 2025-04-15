import { IconCopy } from '@icons/copy';
import ExpWishlistShareUrlController from './wishlist-list-share-url-controller';

const ExpWishListShareUrl = () => {
  const { url, handleCopy } = ExpWishlistShareUrlController();

  return (
    <div className="inline-flex justify-center mt-4 p-2 border border-dashed border-neutral-400 bg-neutral-200 mx-auto">
      <p className="text-neutral-500 text-sm">{url}</p>
      <div
        className="group flex items-center cursor-pointer cart-copy ml-2"
        onClick={handleCopy}>
        <i className="rounded-full mr-1 w-4 h-4 transition-all inline-block align-middle icon">
          <IconCopy className="stroke-neutral-400 group-hover:stroke-primary-default" />
        </i>
        <p className="text-xs font-normal text-neutral-700 capitalize hidden">
          copy
        </p>
      </div>
    </div>
  );
};

export default ExpWishListShareUrl;
