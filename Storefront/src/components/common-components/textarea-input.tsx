import React from 'react';

interface ExpTextAreaInputProps {
    inputValue: string;
    field: string;
    label: string;
    rows:number;
    cols:number;
    changeHandler?(field: string, event: React.FormEvent<HTMLTextAreaElement>, type?: string): void
    onBlurHandler?: any;
    textAreaRef?: any;
    type?: string;
}

const ExpTextAreaInput: React.FC<ExpTextAreaInputProps> = ({inputValue, changeHandler, field, label, rows, cols, onBlurHandler, textAreaRef, type}) => {
    return (
        <div className='gjs-field'>
            <label className='gjs-label'>{label}</label>
            <textarea ref={textAreaRef} value={inputValue} rows={rows} cols={cols} onChange={(e) => changeHandler(field, e, type)} onBlur={onBlurHandler}/>
        </div>
    )
}

export default ExpTextAreaInput;