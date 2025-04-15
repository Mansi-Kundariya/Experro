/* eslint-disable array-callback-return */
import React from 'react';
import Slider from 'rc-slider';
import { IconCross } from '../../../../assets/icons/cross';
import { ExpFacetListingController } from './facet-listing-controller';
import { IconCheck } from '../../../../assets/icons/check';
import { IconUparrow } from '../../../../assets/icons/up-arrow';
import { IconDownarrow } from '../../../../assets/icons/down-arrow';
import { IconClose } from '../../../../assets/icons/close';
import "../facet-listing/rc-slider.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export interface ExpFacetListingProps {
  pageData?: any;
  changeQueryParamFilter: any;
  togglePageSidebar: () => void;
  convertAmountToBaseCurrency?: any;
}

const is_disable_mode = false;

const ExpFacetListing = (props: ExpFacetListingProps) => {
  const {
    pageData,
    changeQueryParamFilter,
    togglePageSidebar,
    convertAmountToBaseCurrency,
  } = props;

  const {
    facets,
    handleFacetsLoadMore,
    selectFacet,
    selectedFacets,
    removeFacet,
    clearAllCheckedFacets,
    toggleSideBar,
    minMaxRangeFacets,
    rangeFacetOnChange,
    updateRangeFacet,
    handleRangeSliderValueReset,
    handleSliderValueOnChange,
    handleSliderValueAfterChange,
    sliderFacetsData,
    isFacetDisabled,
    isLoading,
    handleApplyFilterButtonClick,
    clearAllFacets,
  } = ExpFacetListingController({
    pageData,
    changeQueryParamFilter,
    convertAmountToBaseCurrency,
    disableFacteMode: is_disable_mode,
  });

  return (
    <aside className="page-sidebar has-sticky-enabled basis-[400px] px-4 py-4 fixed top-0 left-0 bg-white h-full z-[30] -translate-x-full group-[.page-sidebar-open]/sidebar:translate-x-0 group-[.page-sidebar-open]/sidebar:transition-all lg:basis-[378px] lg:static lg:translate-x-0 lg:px-4 lg:py-0">
      <div className="page-sidebar-sticky-wrapper flex flex-col h-full lg:block">
        <div className="slidebar-back-button lg:hidden">
          <h4
            onClick={togglePageSidebar}
            className="flex items-center justify-between text-3xl mb-4 w-full">
            <span>Filter</span>
            <i className="icon  w-5 h-5">
              <IconCross className="w-full h-full stroke-black" />
            </i>
          </h4>
        </div>

        <div className="page-sidebar-inner flex-1 overflow-y-auto overflow-x-hidden lg:overflow-hidden">
          {selectedFacets.length > 0 ? (
            <div className="sidebar-block mb-8">
              <h6 className="sidebar-title text-secondary font-secondary font-bold text-xl capitalize mb-4 pb-2 flex items-center justify-between cursor-pointer border-b-1 border-b border-b-solid border-b-gray-200">
                Refined By
              </h6>
              <ul className="filter-list flex items-center flex-wrap">
                {selectedFacets?.map((facet: any, index: number) => (
                  <li key={index} className="mr-2 mb-2">
                    <span className="text-sm text-gray-900 bg-neutral-100 flex items-center py-2 pl-3 pr-[1.875rem] relative">
                      {facet.value}
                      <i
                        className="icon remove-icon group cursor-pointer absolute right-2 top-2/4 -translate-y-2/4"
                        onClick={removeFacet.bind(this, facet)}>
                        <IconClose className="stroke-secondary" />
                      </i>
                    </span>
                  </li>
                ))}
              </ul>

              {selectedFacets.length ? (
                <span
                  onClick={clearAllCheckedFacets}
                  className="text-sm text-gray-900 cursor-pointer hover:text-primary">
                  Clear all
                </span>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}

          {!isLoading ? (
            <>
              {facets?.map((facet: any) => (
                <React.Fragment key={facet?.field_internal_name}>
                  <div
                    className={`sidebar-block group has-accordion mb-8 group ${
                      facet?.default_collapse ? '' : 'sidebar-expanded'
                    } ${
                      facet?.facet_type === 'list'
                        ? 'facet-list'
                        : facet?.facet_type === 'block'
                          ? 'facet-block'
                          : ''
                    } ${`facet-${facet?.display_name.toLowerCase()}`}`}>
                    <h6
                      className="sidebar-title text-secondary font-secondary font-bold text-xl capitalize mb-4 pb-2 flex items-center justify-between cursor-pointer border-b-1 border-b border-b-solid border-b-gray-200"
                      onClick={toggleSideBar}>
                      {facet?.display_name}
                      <i className="icon plus group-[.sidebar-expanded]:hidden pointer-events-none w-4 h-4">
                        <IconDownarrow className="stroke-neutral-400" />
                      </i>
                      <i className="icon minus hidden group-[.sidebar-expanded]:block pointer-events-none w-4 h-4">
                        <IconUparrow className="stroke-neutral-400" />
                      </i>
                    </h6>
                    {facet?.facet_type === 'list' ||
                    facet?.facet_type === 'block' ? (
                      <>
                        <ul className="sidebar-nav-list mb-4 hidden group-[.sidebar-expanded]:flex flex-wrap group-[.facet-block]:-mx-1">
                          {facet?.facet_list?.map(
                            (value: any, index: number) => {
                              if (index < facet.limit) {
                                return (
                                  <li
                                    className={
                                      value.is_enabled || !is_disable_mode
                                        ? 'enable mb-4 w-full group-[.facet-block]:w-6/12 group-[.facet-block]:px-1'
                                        : 'disable mb-4 group-[.facet-block]:w-6/12 group-[.facet-block]:px-1'
                                    }
                                    key={index}>
                                    <div
                                      className={`navList-action relative flex items-center group  ${
                                        value.is_selected ? 'is-selected' : ''
                                      }`}>
                                      <input
                                        type="checkbox"
                                        disabled={isFacetDisabled}
                                        onChange={selectFacet.bind(
                                          this,
                                          facet?.field_internal_name,
                                          value?.val
                                        )}
                                        // disabled={isDisabled}
                                        className={`form-checkbox group peer absolute top-0.5 left-0  h-4 w-4 min-w-4 min-h-4 cursor-pointer appearance-none border border-gray-200 transition-all checked:border-primary checked:bg-primary group-[.facet-block]:w-full group-[.facet-block]:h-full group-[.facet-block]:opacity-0 group-[.facet-block]:top-0 ${
                                          value.is_selected ? 'is-selected' : ''
                                        } ${
                                          facet?.field_internal_name ===
                                          'cust_shape_esai'
                                            ? 'add opacity-0 invisible absolute'
                                            : ''
                                        }`}
                                        id={
                                          value.val + facet?.field_internal_name
                                        }
                                        checked={value.is_selected}
                                      />
                                      {facet?.field_internal_name !==
                                        'cust_shape_esai' && (
                                        <i className="icon group-[.facet-block]:hidden absolute text-white transition-opacity opacity-0 pointer-events-none top-[6px] left-[3px]  peer-checked:opacity-100">
                                          <IconCheck />
                                        </i>
                                      )}
                                      <label
                                        htmlFor={
                                          value.val + facet?.field_internal_name
                                        }
                                        className="form-label cursor-pointer text-gray-900 pl-6 mb-0 group-[.facet-block]:p-4 group-[.facet-block]:border group-[.facet-block]:w-full group-[.facet-block]:text-center group-[.facet-block]:peer-[.is-selected]:border-black">
                                        {value.val}
                                      </label>
                                      {facet?.show_count !== false && (
                                        <span className="result-count ml-1 text-gray-900 text-sm group-[.facet-block]:hidden">
                                          ({value.count})
                                        </span>
                                      )}
                                    </div>
                                  </li>
                                );
                              }
                            }
                          )}

                          {facet?.limit < facet?.facet_list?.length ? (
                            <li className="facet-view-more-wrapper group-[.facet-block]:px-2">
                              <button
                                className="text-black text-sm underline hover:text-primary"
                                onClick={handleFacetsLoadMore.bind(
                                  this,
                                  facet
                                )}>
                                Load More
                              </button>
                            </li>
                          ) : (
                            ''
                          )}
                        </ul>
                      </>
                    ) : facet?.facet_type === 'range' ? (
                      <div className="price-range-input hidden group-[.sidebar-expanded]:block mb-4">
                        <div className="flex items-center -mx-2">
                          <div className="basis-6/12 px-2">
                            <input
                              // disabled={isDisabled}
                              type="input"
                              className="form-input bg-transparent border-neutral-200 py-2 text-sm text-neutral-700 font-normal"
                              placeholder="Min"
                              value={
                                minMaxRangeFacets[facet?.field_internal_name]
                                  ?.min
                              }
                              onChange={rangeFacetOnChange.bind(
                                this,
                                facet?.field_internal_name,
                                'min'
                              )}
                            />
                          </div>
                          <div className="basis-6/12 px-2">
                            <input
                              // disabled={isDisabled}
                              type="input"
                              className="form-input bg-transparent border-neutral-200 py-2 text-sm text-neutral-700 font-normal"
                              placeholder="Max"
                              value={
                                minMaxRangeFacets[facet?.field_internal_name]
                                  ?.max
                              }
                              onChange={rangeFacetOnChange.bind(
                                this,
                                facet?.field_internal_name,
                                'max'
                              )}
                            />
                          </div>
                        </div>
                        <div className="flex items-center flex-wrap mt-2.5">
                          <button
                            onClick={updateRangeFacet.bind(this, facet)}
                            className="button-primary w-full">
                            Update
                          </button>
                          <div className="mt-4">
                            <span
                              className="text-black underline cursor-pointer"
                              onClick={handleRangeSliderValueReset.bind(
                                this,
                                facet
                              )}>
                              Reset
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : facet.facet_type === 'slider' ? (
                      <div className="price-range-slider-toggle hidden group-[.sidebar-expanded]:block has-[.rc-slider]:pb-4">
                        <div className="price-range-slider has-[.rc-slider]:px-2">
                          <Range
                            min={
                              sliderFacetsData[facet.field_internal_name]?.min
                            }
                            max={
                              sliderFacetsData[facet.field_internal_name]?.max
                            }
                            value={
                              sliderFacetsData[facet?.field_internal_name]
                                ?.value
                            }
                            marks={
                              sliderFacetsData[facet?.field_internal_name]
                                ?.marks
                            }
                            step={
                              sliderFacetsData[facet?.field_internal_name]?.step
                            }
                            tipProps={{ visible: true }}
                            onChange={handleSliderValueOnChange.bind(
                              this,
                              facet
                            )}
                            onAfterChange={handleSliderValueAfterChange.bind(
                              this,
                              facet
                            )}
                            tipFormatter={(value) => {
                              return value;
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </React.Fragment>
              ))}
            </>
          ) : (
            <div>
              <div className="sidebar-block has-accordion sidebar-expanded skeleton-loading animate-pulse mb-8">
                <h5 className="sidebar-title skeleton-bg mb-4 h-10 bg-gray-100 dark:bg-gray-100 border-b border-b-solid border-b-gray-200"></h5>
                <ul className="sidebar-nav-list">
                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>

                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>

                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>
                </ul>
              </div>
              <div className="sidebar-block has-accordion sidebar-expanded skeleton-loading animate-pulse mb-8">
                <h5 className="sidebar-title skeleton-bg mb-4 h-10 bg-gray-100 dark:bg-gray-100 border-b border-b-solid border-b-gray-200"></h5>
                <ul className="sidebar-nav-list">
                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>

                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>

                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>
                </ul>
              </div>
              <div className="sidebar-block has-accordion sidebar-expanded skeleton-loading animate-pulse mb-8">
                <h5 className="sidebar-title skeleton-bg mb-4 h-10 bg-gray-100 dark:bg-gray-100 border-b border-b-solid border-b-gray-200"></h5>
                <ul className="sidebar-nav-list">
                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>

                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>

                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>
                </ul>
              </div>
              <div className="sidebar-block has-accordion sidebar-expanded skeleton-loading animate-pulse mb-8">
                <h5 className="sidebar-title skeleton-bg mb-4 h-10 bg-gray-100 dark:bg-gray-100 border-b border-b-solid border-b-gray-200"></h5>
                <ul className="sidebar-nav-list">
                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>

                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>

                  <li className=" mb-4 flex">
                    <div className="skeleton-bg skeleton-cehckbox skeleton-bg w-5 min-w-5 h-5 bg-gray-100"></div>
                    <div className="skeleton-bg skeleton-line skeleton-bg w-full ml-4  bg-gray-100"></div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="filter-button-group lg:hidden">
          <button
            onClick={handleApplyFilterButtonClick}
            className="button-primary w-full">
            Apply
          </button>
          <button
            onClick={clearAllFacets}
            className="button-secondary w-full mt-4">
            Reset Filter
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ExpFacetListing;
