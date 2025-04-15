import React, { useState, useCallback, useEffect } from 'react';
import QueryBuilderModalPopup from '../../components/common-components/query-builder-modal-pop-up';
import {
  ExpContentModelListDropDown,
  ExpCustomImageselector,
  ExpDataSourceDropDown,
  ExpTextInput,
} from '../../components/common-components';
import { TraitInterface } from '../../interfaces/trait.interface';
import { handelEditDataOfContentLibraryFromUiBuilder } from '../../utilities/edit-data-common';

const ExpProductCardWithTiteImage: React.FC = ({
  value,
  changeHandler,
}: {
  value: any;
  changeHandler: any;
}) => {
  const [traitData, setTraitData] = useState(JSON.parse(value));

  const [isQueryBuilderPopupOpen, setIsQueryBuilderPopupOpen] =
    useState<boolean>(false);

  const {
    contentModel,
    modelInternalName,
    dataSource,
    description,
    image_heading,
    buttonText,
    buttonLink,
    bannerType,
    query,
    operator,
    imageData,
  } = traitData;

  const [operatorSelected, setOperatorSelected] = useState<string>(operator?.length ? operator :'AND');
  const [queryBuilder, setQueryBuilder] = useState<any[]>(
    query?.length ? query : []
  );

  const handelInputChange = useCallback(
    (field: string, event: any) => {
      if (field === 'dataSource' && event?.target.value === 'freeForm') {
        setTraitData({
          ...traitData,
          ['contentModel']: '',
          [`${field}`]: event.target.value,
        });
      } else {
        if (field === 'editDataFlag') {
          handelEditDataOfContentLibraryFromUiBuilder(
            traitData,
            setTraitData,
            event
          );
        } else {
          setTraitData({ ...traitData, [`${field}`]: event.target.value });
        }
      }
    },
    [traitData]
  );

  useEffect(() => {
    setTraitData({
      ...traitData,
      query: queryBuilder,
      operator: operatorSelected,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryBuilder, operatorSelected]);

  useEffect(() => {
    changeHandler(JSON.stringify(traitData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traitData, bannerType]);

  return (
    <>
      <div className="custom-fields">
        <div className="custom-fields">
          <ExpDataSourceDropDown
            value={dataSource}
            field={'dataSource'}
            changeHandler={handelInputChange}
          />
        </div>
        {dataSource === 'contentLibrary' ? (
          <>
            <ExpContentModelListDropDown
              value={contentModel}
              changeHandler={handelInputChange}
              modelInternalName={modelInternalName}
            />
          </>
        ) : (
          <>
            <div className="gjs-field">
              <div className="deviceImageTab">
                <div className="deviceImageTab">
                  {typeof image_heading === 'string' && (
                    <ExpTextInput
                      inputValue={image_heading}
                      changeHandler={handelInputChange}
                      field={'image_heading'}
                      label={'Heading Text'}
                    />
                  )}
                  {typeof description === 'string' && (
                    <ExpTextInput
                      inputValue={description}
                      changeHandler={handelInputChange}
                      field={'description'}
                      label={'Description'}
                    />
                  )}
                  {typeof buttonText === 'string' && (
                    <ExpTextInput
                      inputValue={buttonText}
                      changeHandler={handelInputChange}
                      field={'buttonText'}
                      label={'Button Text'}
                    />
                  )}
                  {typeof buttonLink === 'string' && (
                    <ExpTextInput
                      inputValue={buttonLink}
                      changeHandler={handelInputChange}
                      field={'buttonLink'}
                      label={'Button Link'}
                    />
                  )}
                  {typeof imageData !== 'undefined' && (
                    <ExpCustomImageselector
                      traitData={traitData}
                      setTraitData={setTraitData}
                    />
                  )}
                  <div>
                    <div className="gjs-field">
                      <label className="gjs-label">Condition</label>
                      <div>
                        <button
                          className="grape-btn black-grape-btn full-width-btn"
                          onClick={setIsQueryBuilderPopupOpen.bind(this, true)}>
                          Add or Edit Condition
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <QueryBuilderModalPopup
          initialQuery={query}
          initialOperator={operator}
          setQueryBuilder={setQueryBuilder}
          setOperator={setOperatorSelected}
          isQueryBuilderPopupOpen={isQueryBuilderPopupOpen}
          setIsQueryBuilderPopupOpen={setIsQueryBuilderPopupOpen}
        />

        {typeof traitData?.limit === 'string' && (
          <div className="gjs-field">
            <label className="gjs-label">Limit</label>
            <input
              type="text"
              onChange={(event) => handelInputChange('limit', event)}
              value={traitData?.limit}
            />
          </div>
        )}
      </div>
    </>
  );
};
const expProductCardWithTitleImageTrait: TraitInterface = {
  traitName: 'product-card-with-title-image',
  component: ExpProductCardWithTiteImage,
};

export default expProductCardWithTitleImageTrait;
