import { Fragment, memo, Dispatch, SetStateAction } from 'react';
import ExpProductOptionsController from './product-options-controller';

interface ProductOptionsSection {
  product: any;
  productOptions: any;
  setSelectedProductOption: Dispatch<SetStateAction<any>>;
  selectedProductOption: any;
  getVariantFromSelectOption: any;
  analyticsMode?: string | undefined;
  analyticsSearchTerm?: string | null | undefined;
  analyticsCategory?: string | undefined;
}

const ExpProductOptions = (props: ProductOptionsSection) => {
  const {
    product,
    productOptions,
    setSelectedProductOption,
    selectedProductOption,
    getVariantFromSelectOption,
    analyticsMode,
    analyticsSearchTerm,
    analyticsCategory,
  } = props;

  const {
    selectedProductOptionValue,
    handleSelectedProductOptionChange,
    handleProductOptionDropDownChange,
  } = ExpProductOptionsController({
    product,
    productOptions,
    selectedProductOption,
    setSelectedProductOption,
    getVariantFromSelectOption,
    analyticsMode,
    analyticsSearchTerm,
    analyticsCategory,
  });

  const getOptStyle = (option: any) => {
    let style = {};
    if (option?.value_data?.image_url?.length)
      style = { backgroundImage: `url(${option?.value_data?.image_url})` };
    // else if (option?.value_data?.hex_color?.length)
    //   style = { backgroundImage: `url(${option?.value_data?.image_url})` };

    return style;
  };

  return (
    <>
      {productOptions?.map((productOption: any, index: number) => (
        <Fragment key={index?.toString()}>
          {productOption?.type === 'rectangles' ? (
            <div
              className={`${
                productOption?.display_name === 'Metal Color'
                  ? ' mb-4 option-style-swatch'
                  : 'option-style-swatch-ractangle'
              }`}>
              <label
                className="form-label text-sm text-secondary mb-2 lg:mb-4"
                htmlFor="id1">
                {productOption?.display_name}:
                {productOption.required ? '* ' : ''}
                <span className="ml-1">
                  {selectedProductOptionValue[JSON.stringify(productOption.id)]}
                </span>
              </label>

              <div className="form-radio-group form-radio-group-inline form-field flex flex-wrap">
                {productOption?.option_values?.map(
                  (option: any, index: number) => (
                    <div
                      key={index?.toString()}
                      onClick={handleSelectedProductOptionChange.bind(
                        this,
                        productOption.id,
                        option.id
                      )}
                      className={`form-radio-item mb-2 relative flex items-center mr-2 ${
                        productOption.display_name === 'Metal Color'
                          ? option.label
                              .toLowerCase()
                              .split(' ')
                              .join('-')
                              .replace(/[^0-9A-Za-z]/gi, '-')
                          : ''
                      }`}>
                      <input
                        type="radio"
                        className={`form-radio group peer absolute top-0 right-0 left-0 bottom-0 w-full h-full opacity-0 invisible ${
                          selectedProductOptionValue[productOption.id] ===
                          option.label
                            ? 'is-selected'
                            : ''
                        }`}
                        id="radio11"
                      />
                      <label
                        className="form-label py-2 px-5 border border-solid border-gray-200 text-sm cursor-pointer text-secondary peer-[.is-selected]:border-secondary"
                        htmlFor="radio11">
                        {productOption.display_name === 'Metal Color'
                          ? option.label.split(' ').length > 2
                            ? option.label.split(' ')[
                                option.label.split(' ').length - 1
                              ]
                            : 'Pt'
                          : option.label}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : productOption.type === 'radio_buttons' ? (
            <div className="form-field mb-4 option-style-swatch-ractangle">
              <label
                className="form-label text-sm text-secondary mb-2 lg:mb-4"
                htmlFor="id1">
                {productOption?.display_name}:
                {productOption.required ? '* ' : ''}
                <span className="ml-1">
                  {selectedProductOptionValue[JSON.stringify(productOption.id)]}
                </span>
              </label>

              <div className="form-radio-group form-radio-group-inline">
                {productOption?.option_values?.map((option: any) => (
                  <div
                    key={option.id}
                    className="form-radio-item m-b-15"
                    onClick={handleSelectedProductOptionChange.bind(
                      this,
                      productOption.id,
                      option.id
                    )}>
                    <input
                      type="radio"
                      className={`form-radio ${
                        selectedProductOptionValue[productOption.id] ===
                        option.label
                          ? 'is-selected'
                          : ''
                      }`}
                      id="radio1"
                    />
                    <label className="form-label" htmlFor="radio1">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ) : productOption.type === 'dropdown' ? (
            <div className="form-field mb-4">
              <label
                className="form-label text-sm text-secondary mb-2 lg:mb-4"
                htmlFor="id2">
                {productOption.display_name}:{' '}
                {productOption.required ? '* ' : ''}
              </label>

              <select
                onChange={handleProductOptionDropDownChange.bind(
                  this,
                  productOption.id
                )}
                className="form-select">
                {productOption?.option_values?.map(
                  (option: any, index: number) => (
                    <option key={index?.toString()} value={option.id}>
                      {option.label}
                    </option>
                  )
                )}
              </select>
            </div>
          ) : productOption.type === 'swatch' ? (
            <div className="form-field mb-4 option-style-swatch-ractangle">
              <label
                className="form-label text-sm text-secondary mb-2 lg:mb-4"
                htmlFor="id1">
                {productOption.display_name}:
                {productOption.required ? '* ' : ''}
                <span className="ml-1">
                  {selectedProductOptionValue[JSON.stringify(productOption.id)]}
                </span>
              </label>

              <div className="swatch-list flex justify-start align-center">
                {productOption?.option_values?.map(
                  (option: any, index: number) => (
                    <div
                      key={index}
                      onClick={handleSelectedProductOptionChange.bind(
                        this,
                        productOption.id,
                        option.id
                      )}
                      className="form-radio-item m-b-15 mr-3 swatch-item relative">
                      <input
                        type="radio"
                        className={`swatch-radio absolute top-0 left-0 invisible opacity-0 peer ${
                          selectedProductOptionValue[productOption.id] ===
                          option.label
                            ? 'is-selected'
                            : ''
                        }`}
                        id="radio11"
                        aria-label="swathc-radio"
                      />
                      <label
                        className="swatch-label flex items-center justify-center w-5 h-5 cursor-pointer rounded-full border border-solid border-transparent peer-[.is-selected]:border-[#111111]"
                        htmlFor="radio11">
                        <span
                          className="block w-4 h-4 rounded-full"
                          style={getOptStyle(option)}></span>
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            ''
          )}
        </Fragment>
      ))}
    </>
  );
};

export default memo(ExpProductOptions);
