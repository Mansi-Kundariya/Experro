import { useCallback, useEffect, useState } from 'react';

interface ExpProductModifiersControllerProps {
  product: {
    provider_specific_data_ej: { modifiers: any[] };
  };
  selectedModifiers: any;
  setSelectedModifiers: any;
}

const ExpProductModifiersController = (
  props: ExpProductModifiersControllerProps
) => {
  const { product, selectedModifiers, setSelectedModifiers } = props;
  const [selectedModifiersOptionValue, setSelectedModifiersOptionValue] =
    useState<any>({});

  const getSelectedModifierOptionValue = useCallback(() => {
    const selectedModifierValue: any = {};
    // eslint-disable-next-line array-callback-return
    product.provider_specific_data_ej?.modifiers.find((option: any) => {
      if (option.type === 'text') {
        return null;
      }
      const value = option?.option_values.find((value: any) => {
        return value.id.toString() === selectedModifiers[option.id]?.toString();
      });
      if (value) {
        selectedModifierValue[option.id] = value.label;
      }
    });
    setSelectedModifiersOptionValue(selectedModifierValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModifiers]);

  const handleModifierDropDownChange = useCallback(
    (modifierId: string, event: any) => {
      event.preventDefault();
      const selectedValue = event?.target?.value.toString();
      selectedModifiers[`${modifierId}`] = selectedValue;
      setSelectedModifiers({ ...selectedModifiers });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedModifiers]
  );

  const handleModifierChange = useCallback(
    (modifierId: string, optionId: any, event: any) => {
      event.preventDefault();
      if (optionId === '') {
        return;
      }
      selectedModifiers[`${modifierId}`] = optionId.toString();
      setSelectedModifiers({ ...selectedModifiers });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedModifiers]
  );

  const handleCheckboxModifierChange = useCallback(
    (modifierId: string, optionId: any, event: any) => {
      event.preventDefault();
      if (optionId === '') {
        return;
      }
      if (
        selectedModifiers[`${modifierId}`]?.toString() === optionId.toString()
      ) {
        selectedModifiers[`${modifierId}`] = '';
      } else {
        selectedModifiers[`${modifierId}`] = optionId.toString();
      }
      setSelectedModifiers({ ...selectedModifiers });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedModifiers]
  );

  useEffect(() => {
    if (selectedModifiers) {
      getSelectedModifierOptionValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModifiers]);

  return {
    selectedModifiersOptionValue,
    handleModifierDropDownChange,
    handleModifierChange,
    handleCheckboxModifierChange,
  };
};

export default ExpProductModifiersController;
