import { ForgotPassword, SetNewPassword } from "../../interfaces/forgot-password.interface";
import SignupInterface from "../../interfaces/signup.interface";
import { AnalyticsService, AuthService } from "../../services";
import { Http } from "../../utilities";

declare const window: any;

interface LoginRequest {
    username: string;
    password: string;
}

export class ShopifyAuth {
    static async getCustomerDetails() {
        try {
            const response = await Http.get({
                key: 'my-account',
                url: '/exp-sf-cms/api/shopify/account',
                componentId: '',
                enableSSR: false,
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getCustomerOrders() {
        try {
            const response = await Http.get({
                key: 'my-account',
                url: '/exp-sf-cms/api/shopify/account/orders',
                componentId: '',
                enableSSR: false,
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    static async updateCustomerDetails(commonDetails: any) {
        try {
            const response = await Http.put({
                key: 'update-my-account',
                url: '/exp-sf-cms/api/shopify/account',
                componentId: '',
                enableSSR: false,
                config: {
                    body: {
                        customer: commonDetails,
                    },
                },
            });
            if (response.data && response.data.Status === 'success') {
                return true;
            } else {
                return response.data;
            }
        } catch (e) {
            throw new Error(e);
        }
    }
    static async getCustomerAddresses() {
        try {
            const response = await Http.get({
                key: 'my-account',
                url: '/exp-sf-cms/api/shopify/account/addresses',
                componentId: '',
                enableSSR: false,
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }
    static async createCustomerAddress(bodyData: any) {
        try {
            const response = await Http.post({
                key: 'my-account-addresses',
                url: '/exp-sf-cms/api/shopify/account/addresses',
                componentId: '',
                enableSSR: false,
                config: {
                    body: {
                        address: bodyData,
                    },
                },
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }
    static async updateCustomerAddress({ bodyData, addressId }: { bodyData: any, addressId: any }) {
        try {
            const response = await Http.put({
                key: 'my-account-addresses',
                url: `/exp-sf-cms/api/shopify/account/addresses/${encodeURIComponent(addressId)}`,
                componentId: '',
                enableSSR: false,
                config: {
                    body: {
                        address: bodyData,
                    },
                },
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    static async deleteCustomerAddress(AddressId: any) {
        try {
            const response = await Http.delete({
                key: 'my-account-addresses',
                url: `/exp-sf-cms/api/shopify/account/addresses/${encodeURIComponent(AddressId)}`,
                componentId: '',
                enableSSR: false,
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    static async login({ username, password }: LoginRequest) {
        const response = await Http.post({
            key: 'login',
            url: `/exp-sf-cms/api/login`,
            componentId: '',
            enableSSR: false,
            config: {
                body: {
                    email: username,
                    password: password,
                },
            },
        });
        if (response.data && response.data.Status === 'success') {
          if (window._exp_bc_) {
            window._exp_bc_.postMessage({
              "event": "MULTI_TAB_LOGIN_SUCCESSFUL"
            });
          }
            return true;
        } else {
            return response.data;
        }
    }

    static async logout() {
        const response = await Http.get({
            key: 'logout',
            url: `/exp-sf-cms/api/logout`,
            componentId: '',
            enableSSR: false,
        });
        if (response.data && response.data.Status === 'success') {
            await AnalyticsService.logout();
            return true;
        } else {
            return response.data;
        }
    }
    static async forceLogout() {
      try {
        const { userInfo } = AuthService.getUserDetails();
        if (userInfo && userInfo.email) {
          if (
            window.ExpAnalytics &&
            window.ExpAnalytics?.get_device_id &&
            window.ExpAnalytics?.get_device_id() !== userInfo.email
          ) {
            try {
              await AuthService.logout();
              await AnalyticsService.logout();
              return true;
            } catch (e) {
              return true;
            }
          }
          return true;
        } else if (!userInfo || Object.keys(userInfo).length === 0) {
          if (window.ExpAnalytics) {
            try {
              if(process.env.NODE_ENV !== 'development'){
              const deviceId = window.ExpAnalytics.get_device_id();
              if (
                deviceId.match(
                  /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/i
                )
              ) {
                try {
                  await AuthService.logout();
                  await AnalyticsService.logout();
                  return true;
                } catch (e) {
                  return true;
                }
              } else {
                return true;
              }
            }
            } catch (e) {
              return true;
            }
          }
          return true;
        } else {
          return true;
        }
      } catch (err) {
        return true;
      }
    }

    static async activateCustomerAccount({ emailToken, password }: SetNewPassword) {
        const response = await Http.post({
          key: 'forgot-password',
          url: `/exp-sf-cms/api/activate-customer`,
          componentId: '',
          enableSSR: false,
          config: {
            body: {
              emailToken,
              password,
            },
          },
        });
        if (response.data && response.data.Status === 'success') {
          return true;
        } else {
          return response.data;
        }
      }

      static async signup({
        firstName,
        lastName,
        email,
        password,
        phone,
        company,
        customFields,
        gctoken,
      }: SignupInterface) {
        const bodyData = {
          email,
          password,
          firstName,
          lastName,
          phone,
          company,
          customFields,
        };
        if (gctoken) {
          // @ts-ignore
          bodyData.gctoken = gctoken;
        }
        const response = await Http.post({
          key: 'signup',
          url: `/exp-sf-cms/api/signup`,
          componentId: '',
          enableSSR: false,
          config: {
            body: bodyData,
          },
        });
        if (response.data && response.data.Status === 'success') {
          return true;
        } else {
          return response.data;
        }
      }
    
      static async forgotPassword({ email }: ForgotPassword) {
        const response = await Http.post({
          key: 'forgot-password',
          url: `/exp-sf-cms/api/forgot-password`,
          componentId: '',
          enableSSR: false,
          config: {
            body: {
              email,
            },
          },
        });
        if (response.data && response.data.Status === 'success') {
          return true;
        } else {
          return response.data;
        }
      }
    
      static async setNewPassword({ emailToken, password }: SetNewPassword) {
        const response = await Http.post({
          key: 'forgot-password',
          url: `/exp-sf-cms/api/set-new-password`,
          componentId: '',
          enableSSR: false,
          config: {
            body: {
              emailToken,
              password,
            },
          },
        });
        if (response.data && response.data.Status === 'success') {
          return true;
        } else {
          return response.data;
        }
      }
}