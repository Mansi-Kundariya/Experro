import { memo } from 'react';

interface ExpProductCustomFieldsProps {
  product: any;
}

const ExpProductCustomFields = (props: ExpProductCustomFieldsProps) => {
  const { product } = props;

  return (
    <>
      {!!product?.custom_fields_ej?.length && (
        <div className="product-detail-bulletine my-6 ">
          <ul className="m-0 list-style-none">
            {product?.custom_fields_ej.map((obj: any) => (
              <div key={obj.id}>
                <li className='mb-2 last:mb-0'>
                  <span className="product-detail-title text-gray-900 text-sm">{obj?.name}:</span>
                  <span className='text-secondary text-base ml-1'>{obj?.value}</span>
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default memo(ExpProductCustomFields);
