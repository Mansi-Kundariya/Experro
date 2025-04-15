import { ExpFormBuilderField } from '../../interface';

const ExpHTMLInput = ({ formField }: { formField: ExpFormBuilderField }) => {
  return formField?.properties?.defaultValue?.length ? (
    <div className={formField.properties.customClass}
      dangerouslySetInnerHTML={{ __html: formField?.properties?.defaultValue }}
    />
  ) : (
    <></>
  );
};
export default ExpHTMLInput;
