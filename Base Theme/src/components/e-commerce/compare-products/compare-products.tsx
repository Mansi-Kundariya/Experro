import React from 'react';
import { Link } from 'experro-storefront';

import ExpLinkParser from '../../../utils/link-parser';
import {ExpProductPrice} from '../product-price';
import ExpProductCompareController from './compare-products-controller';
import { IconCross } from '../../../assets/icons/cross';
import { IconAlertInfo } from '../../../assets/icons/alert-info';
import { IconBreadcrumbarrow } from '../../../assets/icons/breadcrumb-arrow';

const ExpProductCompare = () => {
  const {
    productData,
    isLoading,
    handleProductRemove,
    handelClearComparePage,
  } = ExpProductCompareController();

  return (
    <>
      {!isLoading ? (
        <>
          {productData?.length < 2 ? (
            <div className="py-8 lg:py-12 text-center page-header-section">
              <div className="container">
                <h1 className="text-2xl lg:text-4xl text-secondary font-secondary page-title">
                  At least 2 products are needed to make a valid comparison.
                </h1>
              </div>
              <p className="text-center text-sm">
                <Link
                  to="/"
                  className="underline text-gray-900 transition-colors hover:text-secondary">
                  Click here to continue shopping
                </Link>
              </p>
            </div>
          ) : (
            <div>
              <div className="page-body compare-page-template">
                <div className="mt-6 mb-12 breadcrumb-section">
                  <div className="container">
                    <ul className="flex items-center *:text-sm breadcrumb">
                      <li>
                        <ExpLinkParser
                          to={'/'}
                          className="text-gray-700 hover:text-secondary font-normal">
                          Home
                        </ExpLinkParser>
                      </li>
                      <li className="flex items-center text-secondary font-normal">
                        <span className="mx-1">
                          <i className="flex w-3 h-3 icon">
                            <IconBreadcrumbarrow />
                          </i>
                        </span>
                        Compare Products
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="py-8 lg:py-12 page-header-section">
                  <div className="container">
                    <h1 className="text-2xl lg:text-4xl text-secondary font-secondary page-title text-center">
                      Comparing {productData?.length} Products
                    </h1>
                  </div>
                  <div></div>
                </div>
                <div className="overflow-x-auto compareWrap compare-table-wrap">
                  <div className="comparTableCustom">
                    <div className="container">
                      <div className="text-right m-b-10 compare-clear pointer">
                        <span onClick={handelClearComparePage} className='cursor-pointer mb-1 inline-block'>Clear All</span>
                      </div>
                      {productData?.length ? (
                        <table className="compareTable border-t border-t-solid border-t-gray-200 overflow-x-auto w-full">
                          <tbody>
                            <tr className="compareTable-row">
                              <th className="text-right compareTable-heading pb-14 pt-10 w-44 border-b border-b-solid border-b-gray-200"></th>
                              {productData?.map(
                                (product: {
                                  id: string;
                                  page_slug_esi: string;
                                  images_ej: any[];
                                  sku_esi: string;
                                  name_eti: string;
                                }) => (
                                  <th
                                    key={product?.id}
                                    className="compareTable-product pb-14 pt-10 w-[16.25rem] min-w-[16.25rem] max-w-[16.25rem] border-b border-b-solid border-b-gray-200">
                                    <div className="card">
                                      <div className="card-figure relative bg-gray-50 mb-4 aspect-square">
                                        <div className="flex items-center justify-center card-img-container h-full">
                                          <Link to={product?.page_slug_esi} className='block w-full h-full'>
                                            <img
                                              src={
                                                product?.images_ej[0]?.url_zoom
                                              }
                                              alt={product?.name_eti}
                                              title={product?.name_eti}
                                              className="card-image lazyautosizes lazyloaded max-h-full"
                                            />
                                          </Link>
                                        </div>
                                        <span className="compareTable-removeProduct doRemove absolute top-2 right-2">
                                          <i
                                            onClick={handleProductRemove.bind(
                                              this,
                                              product?.sku_esi
                                            )}
                                            className="icon w-6 h-6 p-1 flex items-center justify-center cursor-pointer">
                                            <IconCross className="w-full h-full stroke-black"/>
                                          </i>
                                        </span>
                                      </div>
                                      <div className="card-body text-left">
                                        <h4 className="card-title text-sm font-normal mb-5">
                                          <Link
                                            to={product?.page_slug_esi}
                                            className="reverse-color">
                                            {product?.name_eti}
                                          </Link>
                                        </h4>
                                        <div className="price-section-group price-section-group--withoutTax">
                                          <ExpProductPrice
                                            productDetails={product}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </th>
                                )
                              )}
                            </tr>
                            <tr className="compareTable-row">
                              <th className="text-right compareTable-heading py-10 px-3 border-b border-b-solid border-b-gray-200"></th>
                              {productData?.map(
                                (product: {
                                  id: string;
                                  page_slug_esi: string;
                                }) => (
                                  <React.Fragment key={product.id}>
                                    <td className="compareTable-action py-10 px-3 border-b border-b-solid border-b-gray-200">
                                      <Link
                                        to={product?.page_slug_esi}
                                        className="button-primary w-full">
                                        Show Product
                                      </Link>
                                    </td>
                                  </React.Fragment>
                                )
                              )}
                            </tr>

                            <tr className="compareTable-row compare-description align-top">
                              <th className="text-right compareTable-heading py-10 px-3 border-b border-b-solid border-b-gray-200">
                                <span className="compareTable-headingText text-base md:text-2xl">
                                  Description
                                </span>
                              </th>
                              {productData?.map(
                                (product: {
                                  id: string;
                                  description_eti: string;
                                }) => (
                                  <td
                                    key={product.id}
                                    className="compareTable-item medium py-10 px-3 border-b border-b-solid border-b-gray-200"
                                    dangerouslySetInnerHTML={{
                                      __html: product?.description_eti,
                                    }}
                                  />
                                )
                              )}
                            </tr>
                            <tr className="compareTable-row">
                              <th className="text-right compareTable-heading py-10 px-3 border-b border-b-solid border-b-gray-200">
                                <span className="compareTable-headingText text-base md:text-2xl">
                                  Rating
                                </span>
                              </th>
                              {productData?.map((product: { id: string }) => (
                                <td
                                  key={product.id}
                                  className="compareTable-item medium py-10 px-3 border-b border-b-solid border-b-gray-200">
                                  No Reviews
                                </td>
                              ))}
                            </tr>
                            <tr className="compareTable-row">
                              <th className="text-right compareTable-heading py-10 px-3 border-b border-b-solid border-b-gray-200">
                                <span className="compareTable-headingText text-base md:text-2xl">
                                  Availability
                                </span>
                              </th>
                              {productData?.map(
                                (
                                  product: {
                                    availability_description_es: string;
                                  },
                                  index: number
                                ) => (
                                  <td
                                    key={index.toString()}
                                    className="compareTable-item medium py-10 px-3 border-b border-b-solid border-b-gray-200">
                                    {product.availability_description_es ||
                                      'N/A'}
                                  </td>
                                )
                              )}
                            </tr>
                            <tr className="compareTable-row">
                              <td className="text-right compareTable-heading py-10 px-3 border-b border-b-solid border-b-gray-200">
                                <span className="compareTable-headingText text-base md:text-2xl">
                                  Other Details
                                </span>
                              </td>
                              {productData?.map(
                                (
                                  product: { custom_fields_ej: any[] },
                                  index: number
                                ) => (
                                  <td
                                    key={index?.toString()}
                                    className="compareTable-item compare-info medium py-10 px-3 border-b border-b-solid border-b-gray-200">
                                    <ul className="m-0 p-0 list-style-none">
                                      {product?.custom_fields_ej?.map(
                                        (
                                          _cf: { name: string; value: string },
                                          index: any
                                        ) => (
                                          <li
                                            key={index}
                                            className={`TotalSettingDiamondCaratWeight ${_cf?.name
                                              .toLowerCase()
                                              .replace(/ /g, '-')}`}>
                                            <dt className="productView-info-name">
                                              {_cf?.name}:
                                            </dt>
                                            <dd className="productView-info-value">
                                              {_cf.value}
                                            </dd>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </td>
                                )
                              )}
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <div className="productAttributes-message alertbox p-4 table my-8 mx-auto bg-neutral-100 justify-center">
                          <div className="alertbox-icon table-cell pr-5">
                            <i className="icon inline-block align-middle min-w-6">
                              <IconAlertInfo className="stroke-black" />
                            </i>
                          </div>
                          <p className="alertBox-column alertBox-message">
                            There is no item to compare. Please select at least
                            2 products.
                            <Link to={'/'} className="link-primary underline">
                              Continue Shopping
                            </Link>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default ExpProductCompare;
