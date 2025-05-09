export const fieldsOfForm = [
    {
        id: 'hKmpf3c9fUig',
        type: 'paragraphText',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Paragraph Text',
        description: 'Allow user to add multiple lines of text.',
        fieldSettings: [
            'fieldLabel',
            'defaultValue',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'internalName',
        ],
        properties: {
            fieldLabel: 'Enter Data Here',
            description: '',
            placeholder: '',
            defaultValue: 'This is Default value',
            customClass: '',
            validationMessage: 'This field is required and cannot be empty',
            isRequired: true,
        },
        children: [],
    },
    // {
    //   id: 'RrEKz6iluC6n',
    //   type: 'html',
    //   image: {
    //     key: null,
    //     ref: null,
    //     props: {},
    //     _owner: null,
    //   },
    //   name: 'HTML',
    //   description: 'Place a block of free form of HTML, anywhere in your form',
    //   fieldSettings: ['customClass'],
    //   properties: {
    //     customClass: '',
    //   },
    //   children: [],
    // },
    {
        id: 's6Hxr7n2Voqq',
        type: 'number',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Number',
        description: 'Allow user to add numbers',
        fieldSettings: [
            'fieldLabel',
            'defaultValue',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'internalName',
        ],
        properties: {
            fieldLabel: 'Enter Number',
            description: '',
            placeholder: 'Enter number value',
            defaultValue: '',
            customClass: '',
            validationMessage: 'This number is required',
            isRequired: true,
        },
        children: [],
    },
    {
        id: 'mSNKMNardAph',
        type: 'radioButton',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Radio Button',
        description: 'Allow user to select one options from a list.',
        fieldSettings: [
            'fieldLabel',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'choice',
            'radioButtonDefaultValue',
            'internalName',
        ],
        properties: {
            fieldLabel: '',
            description: '',
            placeholder: '',
            customClass: '',
            validationMessage: '',
            defaultValue: 'Option2',
            isRequired: false,
            isShowValueEnabled: false,
            choices: [
                {
                    label: 'Option 1',
                    value: 'Option1',
                    id: 'vDYHV8IfsRRuav',
                },
                {
                    label: 'Option 2',
                    value: 'Option2',
                    id: 'vDYHVsdfds8IRRufav',
                },
                {
                    label: 'Option 3',
                    value: 'Option3',
                    id: 'vDYHV8IsdfsdRRfuav',
                },
            ],
            radioButtonDefaultValue: '',
        },
        children: [],
    },
    {
        id: 'ozff3H2VEUhc',
        type: 'dropdown',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Dropdown',
        description: 'Allows users to one multiple option from a list.',
        fieldSettings: [
            'fieldLabel',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'choice',
            'defaultValueSelect',
            'internalName',
        ],
        properties: {
            fieldLabel: 'Cars',
            description: '',
            placeholder: 'Select a car',
            customClass: '',
            validationMessage: '',
            isRequired: false,
            defaultValue: 'Option 2',
            isShowValueEnabled: false,
            choices: [
                {
                    label: 'Option 1',
                    value: 'Option 1',
                    id: 'Ijn7SOG1wpRz',
                },
                {
                    value: 'Option 2',
                    label: 'Option 2',
                    id: 'RqRYFEMwjRP9',
                },
                {
                    value: 'Option 3',
                    label: 'Option 3',
                    id: 'rJfy7TVvDrnT',
                },
            ],
            defaultValueSelect: [],
            internalName: 'cars',
            isAllowMultipleFileUploads: false,
        },
        children: [],
    },
    {
        id: '2Zf1uWlSXurW',
        type: 'singleLineText',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Single Line Text',
        description: 'Allow user to add single line of text.',
        fieldSettings: [
            'fieldLabel',
            'defaultValue',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'internalName',
        ],
        properties: {
            fieldLabel: 'Test Single Line',
            description: 'Test Single Line',
            placeholder: 'Test ',
            defaultValue: 'Single Default value',
            customClass: 'single-test-class',
            validationMessage: 'this is required',
            isRequired: true,
            internalName: 'test_single_line',
            isShowValueEnabled: false,
            isAllowMultipleFileUploads: false,
        },
    },
    {
        id: '4AuehlkT1Jxm',
        type: 'phoneNumber',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Phone Number',
        description: 'Allows users to enter a phone number.',
        fieldSettings: [
            'fieldLabel',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'defaultValue',
            'phoneFormat',
            'internalName',
        ],
        properties: {
            fieldLabel: 'Phone thisisis',
            description: '',
            placeholder: '',
            defaultValue: '',
            customClass: '',
            validationMessage:
                'This field is required please enter valid phone number',
            isRequired: true,
            phoneFormat: '',
            internalName: 'phone',
            isShowValueEnabled: false,
            isAllowMultipleFileUploads: false,
        },
    },
    {
        id: 'RCc3VS0r1EMM',
        type: 'email',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Email',
        description: 'Allows users to enter a valid email address.',
        fieldSettings: [
            'fieldLabel',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'defaultValue',
            'internalName',
        ],
        properties: {
            fieldLabel: 'Email',
            description: '',
            placeholder: '',
            defaultValue: 'abc@gmail.com',
            customClass: '',
            validationMessage: '',
            isRequired: true,
            internalName: 'email',
            isShowValueEnabled: false,
            isAllowMultipleFileUploads: false,
        },
    },
    {
        id: 'x8njO7e1mRXf',
        type: 'dropdown',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Dropdown',
        description: 'Allows users to one multiple option from a list.',
        fieldSettings: [
            'fieldLabel',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'choice',
            'defaultValueSelect',
            'internalName',
        ],
        properties: {
            fieldLabel: '',
            description: '',
            placeholder: '',
            customClass: '',
            validationMessage: '',
            isRequired: false,
            isShowValueEnabled: false,
            choices: [
                {
                    label: 'Option 1',
                    value: 'Option 1',
                    id: 'PsWpA5Y6J8NX',
                },
            ],
            defaultValueSelect: [],
        },
    },
    {
        id: 'pA2lQiikkP6b',
        type: 'dropdown',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Dropdown',
        description: 'Allows users to one multiple option from a list.',
        fieldSettings: [
            'fieldLabel',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'choice',
            'defaultValueSelect',
            'internalName',
        ],
        properties: {
            fieldLabel: '',
            description: '',
            placeholder: '',
            customClass: '',
            validationMessage: '',
            isRequired: true,
            isShowValueEnabled: false,
            choices: [
                {
                    label: 'Option 1',
                    value: 'Option 1',
                    id: 'EwPybMfDmI3R',
                },
            ],
            defaultValueSelect: [],
        },
    },
    {
        id: 'hrLY1EEVxkrM',
        type: 'checkbox',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Checkbox',
        description: 'Allows users to select multiple option from a list.',
        fieldSettings: [
            'fieldLabel',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'choice',
            'defaultValueSelect',
            'internalName',
        ],
        properties: {
            fieldLabel: 'This is checkbox',
            description: '',
            placeholder: '',
            customClass: 'fasdf',
            validationMessage: 'required',
            isRequired: true,
            isShowValueEnabled: true,
            choices: [
                {
                    label: 'Option 1',
                    value: 'Option 1',
                    id: 'XIMsOH4HZByj',
                },
                {
                    value: 'Option 2',
                    label: 'Option 2',
                    id: 'QvQW7rTBT9aw',
                },
                {
                    value: 'option 3',
                    label: 'option 3',
                    id: 'AZKwnRQ4U3qa',
                },
            ],
            defaultValueSelect: ['Option 1', 'option 3'],
            internalName: 'this_is_checkbox',
            isAllowMultipleFileUploads: false,
        },
    },
    {
        id: 'reMDJOzg4nSt',
        type: 'dateAndTime',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Date and Time',
        description: 'Allows users to enter date and time.',
        fieldSettings: [
            'fieldLabel',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'dateFieldType',
            'dateFormat',
            'internalName',
        ],
        properties: {
            fieldLabel: 'BOD',
            validationMessage: 'as',
            isRequired: false,
            dateFieldType: 'dateAndTime',
            dateFormat: 'dd-mm-yy',
            internalName: 'bod',
            description: 'fas',
            placeholder: 'fas',
            customClass: 'f',
            isShowValueEnabled: false,
            isAllowMultipleFileUploads: false,
        },
    },
    {
        id: 'reMDJOzg4uSt',
        type: 'dateAndTime',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Date and Time',
        description: 'Allows users to enter date and time.',
        fieldSettings: [
            'fieldLabel',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'dateFieldType',
            'dateFormat',
            'internalName',
        ],
        properties: {
            fieldLabel: 'BOD',
            validationMessage: 'as',
            isRequired: true,
            dateFieldType: 'date',
            dateFormat: 'dd-mm-yy',
            internalName: 'bod',
            description: 'fas',
            placeholder: 'fas',
            customClass: 'f',
            isShowValueEnabled: false,
            isAllowMultipleFileUploads: false,
        },
    },
    {
        id: 'reMuJOzg4nSt',
        type: 'dateAndTime',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Date and Time',
        description: 'Allows users to enter date and time.',
        fieldSettings: [
            'fieldLabel',
            'placeholder',
            'customClass',
            'validationMessage',
            'isRequired',
            'description',
            'dateFieldType',
            'dateFormat',
            'internalName',
        ],
        properties: {
            fieldLabel: 'BOD',
            validationMessage: 'as',
            isRequired: true,
            dateFieldType: 'time',
            dateFormat: 'dd-mm-yy',
            internalName: 'bod',
            description: 'fas',
            placeholder: 'fas',
            customClass: 'f',
            isShowValueEnabled: false,
            isAllowMultipleFileUploads: false,
        },
    },
    // {
    //   id: 'WMdiKN87swaV',
    //   type: 'media',
    //   image: {
    //     key: null,
    //     ref: null,
    //     props: {},
    //     _owner: null,
    //   },
    //   name: 'Media',
    //   description: 'Allow user to add files.',
    //   fieldSettings: [
    //     'fieldLabel',
    //     'validationMessage',
    //     'isRequired',
    //     'description',
    //     'mediaUploadPath',
    //     'mediaUploadExtension',
    //     'isAllowMultipleFileUploads',
    //     'mediaFileUploadLimit',
    //     'mediaMaximumFiledUploadSize',
    //     'customClass',
    //     'internalName',
    //   ],
    //   properties: {
    //     fieldLabel: 'Image',
    //     validationMessage: '',
    //     isRequired: false,
    //     description: '',
    //     isAllowMultipleFileUploads: false,
    //     mediaUploadExtension: '',
    //     mediaUploadPath: '35377735-8a45-4873-96c9-53ab69022b2b',
    //     customClass: '',
    //     mediaMaximumFiledUploadSize: 1,
    //     internalName: 'image',
    //     isShowValueEnabled: false,
    //   },
    // },
    {
        id: 'JgDdeiBFXf9u',
        type: 'hiddenField',
        image: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
        },
        name: 'Hidden Field',
        description:
            'Stores information that should not be visible to the user but can be processed and saved with the user submission.',
        fieldSettings: ['fieldLabel', 'internalName'],
        properties: {
            fieldLabel: 'This is Hidden',
            internalName: 'this_is_hidden',
            isRequired: true,
            isShowValueEnabled: false,
            isAllowMultipleFileUploads: false,
        },
    },
]
