import React, { useState, useCallback } from 'react';
import { TraitInterface } from '../../interfaces/trait.interface';

const ExpTextAreaTrait: React.FC = ({value, changeHandler}: {value: string, changeHandler: any}) => {
    const [textAreaValue, setTextAreaValue] = useState(value);

    const handelTextAreaValueChange = useCallback((event: any) => {
        setTextAreaValue(event.target.value);
    }, []);

    const handelTextAreatBlur = useCallback(() => {
        changeHandler(textAreaValue);
    }, [changeHandler, textAreaValue])

    return (
        <div>
            <textarea rows={6}  onChange={handelTextAreaValueChange} onBlur={handelTextAreatBlur}>{textAreaValue}</textarea>
        </div>
    )
}

const expTextAreaTrait: TraitInterface = {
    traitName: 'text-area',
    component: ExpTextAreaTrait,
}

export default expTextAreaTrait;