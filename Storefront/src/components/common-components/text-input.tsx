import React from 'react';

interface ExpTextInputProps {
    inputValue: string;
    field: string;
    label: string;
    changeHandler(field: string, event: React.FormEvent<HTMLInputElement>, type: string): void
    handelOnBlur?: any
    type?: string
}

const ExpTextInput: React.FC<ExpTextInputProps> = ({inputValue, changeHandler, field, label, handelOnBlur, type}) => {
    return (
        <div className='gjs-field'>
            <label className='gjs-label'>{label}</label>
            <input type="text" value={inputValue} onChange={(e) => changeHandler(field, e, type)} onBlur={handelOnBlur}></input>
        </div>
    )
}

export default ExpTextInput;