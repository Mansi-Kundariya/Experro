import { memo } from 'react';
import ExpProductImageController from './product-share-controller';
import { IconShare } from '../../../../assets/icons/share';
import { IconFacebook } from '../../../../assets/icons/facebook';
import { Iconenvelop } from '../../../../assets/icons/enevlope';
import { IconPinterest } from '../../../../assets/icons/pintrest';
import { IconPrint } from '../../../../assets/icons/print';
import { IconTwitter } from '../../../../assets/icons/twitter';

interface ExpProductShareProps {
  product: {
    brand_esi: string;
    categories_esai: string;
    calculated_price_efi: number;
    inventory_tracking_esi: string;
    inventory_level_eii: number;
    sku_esi: string;
    sku_for_analytics_esli: any;
    name_esi: string;
    provider_id_esi: string;
  };
}
const ExpProductShare = (props: ExpProductShareProps) => {
  const { product } = props;
  const { setIsShare, isShare, printProduct } = ExpProductImageController();

  return (
    <div className="px-2 social-share-button">
      <div className="productView-share relative">
        <button
          className={`productView-share-toggle button-secondary p-0 w-[3.125rem] h-[3.125rem] flex items-center justify-center group ${isShare ? 'is-open' : ''
            }`}
          onClick={() => setIsShare(!isShare)}
          data-dropdown="productView-share-dropdown"
          aria-expanded="false">
          <i className="icon w-6 h-6 flex items-center justify-center">
            <IconShare />
          </i>
        </button>

        <div
          className={`productView-share-dropdown z-1 absolute top-full left-0 right-0 bg-white shadow-md py-4 px-1 ${isShare ? 'is-open block' : 'hidden'}`}
          data-dropdown-content=""
          id="productView-share-dropdown"
          aria-hidden="true">
          <div className="addthis_toolbox">
            <ul className="socialLinks socialLinks--colors list-style-none text-center">
              <li className="socialLinks-item socialLinks-item--facebook">
                <a
                  className="socialLinks__link icon icon--facebook flex items-center justify-center mx-auto h-8 w-8 [&>svg]:fill-black"
                  title="Facebook"
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noreferrer">
                  <span className="hidden">Facebook</span>
                  <IconFacebook />
                </a>
              </li>

              <li className="socialLinks-item socialLinks-item--email">
                <a
                  className="socialLinks__link icon icon--email flex items-center justify-center mx-auto p-2 h-8 w-8 [&>svg]:fill-black"
                  title="Email"
                  href={`mailto:?subject=${encodeURIComponent(
                    product?.name_esi
                  )}&body=${encodeURIComponent(window.location.href)}`}
                  target="_self"
                  rel="noopener">
                  <span className="hidden">Email</span>
                  <Iconenvelop />
                </a>
              </li>

              <li className="socialLinks-item socialLinks-item--print">
                <div
                  className="socialLinks__link icon icon--print pointer flex items-center justify-center mx-auto p-1.5 h-8 w-8 [&>svg]:fill-black"
                  title="Print"
                  onClick={printProduct}>
                  <span className="hidden">Print</span>
                  <IconPrint />
                </div>
              </li>

              <li className="socialLinks-item socialLinks-item--twitter">
                <a
                  className="socialLinks__link icon icon--twitter flex items-center justify-center mx-auto p-1.5 h-8 w-8 [&>svg]:fill-black"
                  href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(
                    product.name_esi
                  )}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Twitter">
                  <span className="hidden">Twitter</span>
                  <IconTwitter />
                </a>
              </li>

              <li className="socialLinks-item socialLinks-item--pinterest">
                <a
                  className="socialLinks__link icon icon--pinterest flex items-center justify-center mx-auto h-8 w-8 [&>svg]:fill-black"
                  title="Pinterest"
                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                    window.location.href
                  )}&description=${encodeURIComponent(product?.name_esi)}`}
                  target="_blank"
                  rel="noreferrer">
                  <span className="hidden">Pinterest</span>
                  <IconPinterest />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ExpProductShare);
