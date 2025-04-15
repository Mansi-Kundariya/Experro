import { AnalyticsService } from 'experro-storefront';
import { useEffect } from 'react';

const ExpStorefrontCheckoutIframe = () => {
  useEffect(() => {    
    window.addEventListener('message', function (e: { data: string }) {
      try {
        const {
          actionType,
          user_email,
          customer_type,
          shipping_address,
          billing_address,
        } = JSON.parse(e.data);

        if (actionType === 'continuedAsGuest' && customer_type === 'Guest') {
          AnalyticsService.login(user_email);
          AnalyticsService.trackEvent({
            eventData: {
              user_email: user_email,
            },
            eventName: 'checkout_as_guest',
            sum: 0,
            count: 1,
            dur: 0,
          });
        } else if (customer_type === 'Logged-in') {
          AnalyticsService.login(user_email);
        } else if (actionType === 'logout') {
          AnalyticsService.logout();
        }  else if (actionType === 'shippingCompleted') {
          AnalyticsService.trackEvent({
            eventData: {
              shipping_address: shipping_address,
            },
            eventName: 'checkout_shipping_completed',
            sum: 0,
            count: 1,
            dur: 0,
          });
        } else if (actionType === 'billingCompleted') {
          AnalyticsService.trackEvent({
            eventData: {
              billing_address: billing_address,
            },
            eventName: 'checkout_billing_completed',
            sum: 0,
            count: 1,
            dur: 0,
          });
        }
      } catch (e) {}
    });
  }, []);
  
  return (
    <>
      <div className="_exp_page_main_container_ page-body mt-8">
        <div id="checkout_page"></div>
      </div>
    </>
  );
};

export default ExpStorefrontCheckoutIframe;