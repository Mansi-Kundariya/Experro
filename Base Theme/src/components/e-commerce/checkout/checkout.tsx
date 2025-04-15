import { Link } from 'experro-storefront';
import { IconAlertInfo } from '../../../assets/icons/alert-info';
import ExpCheckoutController from './checkout-controller';

const ExpCheckout = () => {
  const { checkoutError, isLoading } = ExpCheckoutController();

  return (
    <div className="_exp_page_main_container_ page-body mt-8">
      <div id="checkout_page"></div>

      {checkoutError ? (
        <div className="container">
          <div className="alertbox p-4 table my-8 mx-auto bg-neutral-100 productAttributes-message justify-center">
          <div className="alertbox-icon table-cell pr-5">
                    <i className="icon inline-block align-middle min-w-6">
                <IconAlertInfo />
              </i>
            </div>
            <p className="alertBox-column alertBox-message">
              {checkoutError}
              <Link to={'/cart'} className="link-primary m-l-5">
                Click here to manage your cart
              </Link>
            </p>
          </div>
        </div>
      ) : (
        ''
      )}

      {isLoading && (
        <div className="loader-wrapper">
          <div className="loader-main flex"></div>
        </div>
      )}
    </div>
  );
};

export default ExpCheckout;
