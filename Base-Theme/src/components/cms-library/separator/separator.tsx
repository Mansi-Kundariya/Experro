import { CSSProperties } from 'react';

export interface ExpSeparatorProps {
  separatorHeight?: string | number;
  separatorColor?: string;
}
const ExpSeparator = (props: any) => {
  const { component_content } = props;

  const { separatorColor, separatorHeight }: any = JSON.parse(
    component_content === undefined ? '{}' : component_content
  );

  const separatorColorStyle: CSSProperties = {
    borderColor:
      typeof separatorColor === 'string' ? separatorColor : '#E5E5E5',
    borderWidth: separatorHeight ? `${separatorHeight}px` : '2px',
  };

  return (
    <>
      <hr style={separatorColorStyle}></hr>
    </>
  );
};

export default ExpSeparator;
