import React, { useState, useCallback } from "react";
import { TraitInterface } from "../../interfaces/trait.interface";

const ExpDataSourceTrait = ({ value, changeHandler }: { value: string, changeHandler: any }) => {
    const [dataSource, setDataSource] = useState(value);

    const changeDataSource = useCallback((event: any) => {
        setDataSource(event.target.value);
        changeHandler(event.target.value)
    }, [changeHandler])

  return (
    <div>
      <select onChange={changeDataSource} value={dataSource}>
        <option value='contentLibrary'>Content Library</option>
        <option value='freeForm'>Free Form</option>
      </select>
    </div>
  );
};

const expDataSourceTrait: TraitInterface = {
  traitName: "data-source",
  component: ExpDataSourceTrait,
};

export default expDataSourceTrait;
