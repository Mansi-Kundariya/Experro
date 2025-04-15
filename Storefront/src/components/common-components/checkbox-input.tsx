import React from 'react';

interface ExpCheckboxInputProps {
    inputValue: string | undefined;
    field: string;
    label: string;
    changeHandler(field: string, event: React.FormEvent<HTMLInputElement>, type?: string): void
    type: string
}

const ExpCheckboxInput: React.FC<ExpCheckboxInputProps> = ({inputValue, changeHandler, field, label, type}) => {
        
    const checkBoxId = Math.random().toString()
    return (
        <div className='checkbox-wrap'>
            <input type="checkbox" checked={inputValue === 'on' ? true : false} onChange={(e) => changeHandler(field, e, type)} id={checkBoxId}></input>
            <label className='gjs-label' htmlFor={checkBoxId}>{label}</label>
        </div>
    )
}

export default ExpCheckboxInput;