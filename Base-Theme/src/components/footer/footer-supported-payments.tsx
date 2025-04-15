import { Fragment } from 'react';
import { IconAmazon } from '../../assets/icons/amazon';
import { IconAmx } from '../../assets/icons/american-express';
import { IconMasterCard } from '../../assets/icons/mastercard';
import { IconPaypal } from '../../assets/icons/paypal';
import { IconVisa } from '../../assets/icons/visa';

const supportedPayments = [
  {
    name: 'Amazon Pay',
    icon: <IconAmazon />,
  },
  {
    name: 'Master Card',
    icon: <IconMasterCard />,
  },
  {
    name: 'American Express',
    icon: <IconAmx />,
  },
  {
    name: 'Pay Pal',
    icon: <IconPaypal />,
  },
  {
    name: 'Visa',
    icon: <IconVisa />,
  },
];

const FooterSupportedPayments = ({ pageData }: any) => {
  return (
    <div className="w-full lg:w-4/12">
      <ul className="payment-icons flex align-center justify-right">
        {supportedPayments.map((supportedPayment, index) => {
          return (
            <Fragment key={index}>
              {pageData.globalSettings?.footer_com &&
                pageData.globalSettings?.footer_com[0]
                  .online_transaction_platform_esa &&
                pageData.globalSettings?.footer_com[0].online_transaction_platform_esa?.includes(
                  supportedPayment.name
                ) && (
                  <li>
                    <i className="icon">{supportedPayment.icon}</i>
                  </li>
                )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterSupportedPayments;
