// Operation on text type fields
const TEXT_FIELD_OPERATIONS = [
    { label: 'Contains', value: 'contains' },
    { label: 'Does Not Contain', value: 'does_not_contains' },
];

// Operation on string type fields
const STRING_FIELD_OPERATIONS = [
    { label: 'Equal To', value: 'equal_to' },
    { label: 'Not Equal To', value: 'not_equal_to' },
];

// Operation on boolean type fields
const BOOLEAN_FIELD_OPERATIONS = [
    { label: 'Equal To', value: 'equal_to' },
    { label: 'Not Equal To', value: 'not_equal_to' },
];

// Operation on number type fields
const NUMBER_FIELD_OPERATIONS = [
    { label: 'Equals to', value: 'equal_to' },
    { label: 'Greater than', value: 'greater_than' },
    { label: 'Less than', value: 'less_than' },
    { label: 'Greater than or equal to', value: 'greater_than_or_equal_to' },
    { label: 'Less than or equal to', value: 'less_than_or_equal_to' },
];

export { TEXT_FIELD_OPERATIONS, STRING_FIELD_OPERATIONS, BOOLEAN_FIELD_OPERATIONS, NUMBER_FIELD_OPERATIONS }
