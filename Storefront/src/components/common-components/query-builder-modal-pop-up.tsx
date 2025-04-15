import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { EcommerceService } from '../../services';
import { IconTrash } from '../../assets/images/icons/trash';
import { CloseIcon } from '../../assets/images/icons/close-icon';
import { IconQuestion } from '../../assets/images/icons/question';
import { PluseCircle } from '../../assets/images/icons/plus-circle';
import { IconArrowRight } from '../../assets/images/icons/arrow-right';
import {
  TEXT_FIELD_OPERATIONS,
  STRING_FIELD_OPERATIONS,
  BOOLEAN_FIELD_OPERATIONS,
  NUMBER_FIELD_OPERATIONS,
} from '../../utilities/query-builder-conditions';

interface QueryBuilderModalPopupProps {
  isQueryBuilderPopupOpen: boolean;
  setIsQueryBuilderPopupOpen: any;
  setQueryBuilder: any;
  setOperator: any;
  initialQuery: any;
  initialOperator: any;
}

const QueryBuilderModalPopup = ({
  setOperator,
  setQueryBuilder,
  isQueryBuilderPopupOpen,
  setIsQueryBuilderPopupOpen,
  initialQuery,
  initialOperator,
}: QueryBuilderModalPopupProps) => {
  const [conditionFields, setConditionFields] = useState([]);
  const [operatorsPerConditions, setOperatorsPerConditions] = useState<any>([
    {
      data: STRING_FIELD_OPERATIONS,
    },
  ]);
  const [operatorSelected, setOperatorSelected] = useState('AND');
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [queries, setQueries] = useState([
    { field: '', condition: '', value: '', id: 1, type: '', fieldName: '' },
  ]);
  const [conditionSequence, setConditionSequence] = useState(1);
  const [valueOptions, setValueOptions] = useState<any>([]);

  useEffect(() => {
    if (initialOperator && initialQuery) {
      const tempOperatorsPerConditions = [
        {
          data: STRING_FIELD_OPERATIONS,
        },
      ];
      initialQuery?.map((ele, index) => {
        const type = ele.type;
        setConditionData(
          type,
          ele.field,
          tempOperatorsPerConditions,
          index + 1
        );
      });
      initialQuery.map((query) => {
        if (query.field.endsWith('_esi') || query.field.endsWith('_esai')) {
          getValueOptions(query.field, query.id);
        }
      });
      if (initialQuery.length) {
        setQueries(initialQuery);
        setOperatorSelected(initialOperator);
      } else {
        setQueries([
          {
            field: '',
            condition: '',
            value: '',
            id: 1,
            type: '',
            fieldName: '',
          },
        ]);
        setOperatorSelected('AND');
      }
    }
    getConditionFields();
  }, [initialQuery]);

  // If the part of condition is blank, disable save button.
  useEffect(() => {
    for (const query of queries) {
      if (query.field === '' || query.condition === '' || query.value === '') {
        setIsReadyToSubmit(false);
      } else {
        setIsReadyToSubmit(true);
      }
    }
  }, [queries]);

  // Toggle AND OR condition
  const toggleOperatorButton = (event) => {
    setOperatorSelected(event.target.value);
  };

  // Modal save button click.
  const handleSave = () => {
    setOperator(operatorSelected);
    setQueryBuilder(queries);
    setIsQueryBuilderPopupOpen(false);
  };

  // Modal cancel button click.
  const handleCancel = () => {
    setIsQueryBuilderPopupOpen(false);
  };

  // Delete a given condition block based on id.
  const handleDelete = (id: number) => {
    const newQueries = queries.filter((query) => {
      return query.id != id;
    });
    setQueries(newQueries);
    setConditionSequence(conditionSequence - 1);
  };

  // Add new condition when add condition button is clicked.
  const handleAddCondition = () => {
    setIsReadyToSubmit(false);
    setConditionSequence(conditionSequence + 1);

    // Generate id for new condition.
    const newId = queries.reduce(
      (query, max) => (query > max.id ? query : max.id),
      0
    );
    setQueries([
      ...queries,
      {
        field: '',
        condition: '',
        value: '',
        id: newId + 1,
        type: '',
        fieldName: '',
      },
    ]);
  };

  const getConditionFields = async () => {
    try {
      const fields = await EcommerceService.getEcommerceModalFields();
      const uniqueFields = fields.items.filter(
        (
          (set) => (f) =>
            !set.has(f.title) && set.add(f.title)
        )(new Set())
      );
      setConditionFields(uniqueFields);
    } catch (error) {
      console.error(error);
    }
  };

  const getValueOptions = async (field_name: string, id: number) => {
    try {
      const values = await EcommerceService.getEcommerceModalValues(field_name);
      const options = values.items;
      const temp = [{ valueOptions: options, valueIndex: id }];
      setValueOptions((prev) => [...prev, temp]);
    } catch (err) {
      console.error(err);
    }
  };

  // Generate dynamic options on selecting field
  const getOptions = useCallback(
    (query) => {
      let temp = [];
      valueOptions.forEach((ele) => {
        if (ele[0]?.valueIndex == query.id) {
          temp = ele[0].valueOptions?.map((value, index) => {
            return {
              value: value,
              label: value,
              id: index,
            };
          });
        }
      });
      return temp;
    },
    [valueOptions]
  );

  // Set condition dropdown data on field selection
  const setConditionData = (
    type: string,
    field_name: string,
    tempOperatorsPerConditions: any[],
    index: number
  ) => {
    if (type === 'text' || type === 'rich-text') {
      if (field_name.endsWith('_eti') || field_name.endsWith('_etai')) {
        if (field_name.startsWith('name')) {
          tempOperatorsPerConditions.splice(index, 1);
          tempOperatorsPerConditions.splice(index, 0, {
            data: [...TEXT_FIELD_OPERATIONS, ...STRING_FIELD_OPERATIONS],
          });
        } else {
          tempOperatorsPerConditions.splice(index, 1);
          tempOperatorsPerConditions.splice(index, 0, {
            data: TEXT_FIELD_OPERATIONS,
          });
        }
      } else {
        tempOperatorsPerConditions.splice(index, 1);
        tempOperatorsPerConditions.splice(index, 0, {
          data: STRING_FIELD_OPERATIONS,
        });
      }
    } else if (type === 'number') {
      tempOperatorsPerConditions.splice(index, 1);
      tempOperatorsPerConditions.splice(index, 0, {
        data: NUMBER_FIELD_OPERATIONS,
      });
    } else if (type === 'boolean') {
      tempOperatorsPerConditions.splice(index, 1);
      tempOperatorsPerConditions.splice(index, 0, {
        data: BOOLEAN_FIELD_OPERATIONS,
      });
    }
    setOperatorsPerConditions(tempOperatorsPerConditions);
  };

  // Modifies the condition based on user input.
  const handleQueryCondition = async (handler: string, e: any, id: number) => {
    if (
      handler === 'selectedValue' ||
      handler === 'textValue' ||
      handler === 'skuArray'
    ) {
      let updateValue = '';
      const condition = queries.find((query) => query.id == id);
      if (handler === 'skuArray') {
        updateValue = e
          .map((ele) => {
            return `${ele.value}`;
          })
          .join();
      } else {
        handler === 'selectedValue'
          ? (updateValue = e.value)
          : (updateValue = e.target.value);
      }
      const updatedCondition = {
        ...condition,
        value: updateValue,
      };
      const newQueries = queries.map((query) =>
        query.id != id ? query : updatedCondition
      );
      setQueries(newQueries);
    } else {
      const condition = queries.find((query) => query.id == id);
      const updatedCondition = {
        ...condition,
        [handler]: e.value,
      };
      const newQueries = queries.map((query) =>
        query.id != id ? query : updatedCondition
      );
      setQueries(newQueries);

      if (handler === 'field') {
        const temp = e.dataType;
        const condition = queries.find((query) => query.id == id);
        const updatedCondition = {
          ...condition,
          [handler]: e.value,
          fieldName: e.label,
          type: temp,
          value: '',
        };
        const newQueries = queries.map((query) =>
          query.id != id ? query : updatedCondition
        );
        setQueries(newQueries);
        const field = conditionFields.find(
          (conditionField) => conditionField.field_name == e.value
        );
        const tempOperatorsPerConditions = [...operatorsPerConditions];
        if (
          field.field_name.endsWith('_esi') ||
          field.field_name.endsWith('_esai')
        ) {
          getValueOptions(field.field_name, id);
        }
        setConditionData(
          field.type,
          field.field_name,
          tempOperatorsPerConditions,
          id
        );
      }
    }
  };

  return (
    <Modal
      className={
        'smallReactModal visualBulderModal queryBuilderModel storefront-modal'
      }
      isOpen={isQueryBuilderPopupOpen}
      onRequestClose={() => setIsQueryBuilderPopupOpen(false)}
      appElement={document.getElementById('__experro_gjs_iframe__')}
      contentLabel="Query Builder">
      {/* Modal header */}
      <div className="reactModalHeader">
        <h5>Add Condition</h5>
        <button
          onClick={setIsQueryBuilderPopupOpen.bind(this, false)}
          className="reactModalCloseButton"
          type="button">
          <CloseIcon />
        </button>
      </div>

      {/* Modal body */}
      <div className="reactModalBody">
        <div className="query-builder-btn">
          <div className="toggle-btn">
            <div className="toggle-item">
              <input
                type="radio"
                className="swatch-radio"
                id="and"
                name="selector"
                value="AND"
                checked={operatorSelected === 'AND' ? true : false}
                onChange={(e) => toggleOperatorButton(e)}
              />
              <label htmlFor="and" className="swatch-label">
                AND
              </label>
            </div>
            <div className="toggle-item">
              <input
                type="radio"
                className="swatch-radio"
                id="or"
                name="selector"
                value="OR"
                checked={operatorSelected === 'OR' ? true : false}
                onChange={(e) => toggleOperatorButton(e)}
              />
              <label htmlFor="or" className="swatch-label">
                OR
              </label>
            </div>
          </div>
          <div className="add_condition_btn">
            <button type="button" onClick={handleAddCondition}>
              <i className="icon">
                <PluseCircle />
              </i>
              Add Condition
            </button>
          </div>
        </div>

        <div className="query-builder-accordion">
          <Accordion allowMultipleExpanded allowZeroExpanded>
            {queries?.map((query, i) => {
              return (
                <AccordionItem key={query.id}>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <i className="icon arrow-right">
                        <IconArrowRight />
                      </i>
                      Condition {i + 1}
                      <div className="delete-btn">
                        {queries.length > 1 && (
                          <button onClick={() => handleDelete(query.id)}>
                            <i className="icon">
                              <IconTrash />
                            </i>
                          </button>
                        )}
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>

                  <AccordionItemPanel>
                    {/* Field */}
                    <div className="rule-condition input-field">
                      <label htmlFor="value" className="input-label">
                        <span>*</span> Field
                      </label>
                      {conditionFields?.length > 0 && (
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          id="field"
                          name="field"
                          menuPortalTarget={document.body}
                          options={conditionFields?.map((conditionField) => {
                            return {
                              key: conditionField.id,
                              dataType: conditionField.type,
                              value: conditionField.field_name,
                              label: conditionField.title,
                            };
                          })}
                          onChange={(e) =>
                            handleQueryCondition('field', e, query.id)
                          }
                          defaultValue={
                            query.field?.length
                              ? {
                                  value: query.field,
                                  label: conditionFields.map((label) => {
                                    if (label.field_name === query.field)
                                      return label.title;
                                  }),
                                }
                              : {
                                  value: 'Select Condition',
                                  label: 'Select Condition',
                                  isdisabled: true,
                                }
                          }
                        />
                      )}
                    </div>

                    {/* Condition */}
                    <div className="rule-condition input-field input-field-condition">
                      <label htmlFor="value" className="input-label">
                        <span>*</span> Condition
                      </label>
                      {conditionFields?.length > 0 && (
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          id="condition"
                          name="condition"
                          menuPortalTarget={document.body}
                          options={operatorsPerConditions[query.id]?.data?.map(
                            (conditionOperation, index) => {
                              return {
                                key: index,
                                value: conditionOperation.value,
                                label: conditionOperation.label,
                              };
                            }
                          )}
                          onChange={(e) =>
                            handleQueryCondition('condition', e, query.id)
                          }
                          defaultValue={operatorsPerConditions[
                            query.id
                          ]?.data?.map((conditionOperation, index) => {
                            if (conditionOperation.value === query.condition)
                              return {
                                key: index,
                                value: conditionOperation.value,
                                label: conditionOperation.label,
                              };
                          })}
                        />
                      )}
                    </div>

                    {/* Value */}
                    <div className="input-field input-value">
                      <label htmlFor="value" className="input-label">
                        <span>*</span> Value
                      </label>
                      {query.field.endsWith('_esi') ||
                      query.field.endsWith('_esai') ? (
                        <Select
                          isMulti={query.field === 'sku_esi' ? true : false}
                          closeMenuOnSelect={
                            query.field === 'sku_esi' ? false : true
                          }
                          className="basic-single"
                          classNamePrefix="select"
                          name="value"
                          menuPortalTarget={document.body}
                          options={getOptions(query)}
                          onChange={(e) =>
                            handleQueryCondition(
                              query.field === 'sku_esi'
                                ? 'skuArray'
                                : 'selectedValue',
                              e,
                              query.id
                            )
                          }
                          defaultValue={
                            query.field === 'sku_esi'
                              ? query?.value?.length
                                ? query?.value.split(',').map((val) => {
                                    return { label: `${val}`, value: `${val}` };
                                  })
                                : ''
                              : query?.value?.length
                              ? {
                                  label: `${query.value}`,
                                  value: `${query.value}`,
                                }
                              : {
                                  value: 'Select Condition',
                                  label: 'Select Condition',
                                  isdisabled: true,
                                }
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          name="value"
                          id="value"
                          placeholder="Enter value"
                          onChange={(e) =>
                            handleQueryCondition('textValue', e, query.id)
                          }
                          value={query.value}
                        />
                      )}
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>

      {/* Modal footer */}
      <div className="reactModalFooter">
        <div className="help-icon">
          <i className="icon">
            <IconQuestion />
          </i>
        </div>
        <div className="modal-footer-button">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isReadyToSubmit}
            className="buttonPrimary"
            type="button">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default QueryBuilderModalPopup;
