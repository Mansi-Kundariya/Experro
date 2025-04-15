import expGenerateFormField from '../generate-form-field';
import { ExpFormBuilderField } from '../interface';
import { useTranslation } from 'react-i18next';

const ExpFormLayoutTwo = ({
  handleSubmit,
  formFields,
  setFormFields,
  formData,
}: {
  handleSubmit: any;
  formFields: ExpFormBuilderField[];
  setFormFields: any;
  formData: any;
  onChange: (value: any) => void;
  formSubmitStatus: boolean;
  token: any;
  isLoadingData: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="px-4 flex flex-wrap -mx-4 [&_.form-input]:border-t-0 [&_.form-input]:border-r-0 [&_.form-input]:border-l-0 [&_.form-input]:bg-transparent [&_.form-input]:px-0 [&_.form-input]:py-3 [&_.form-field:last-child]:mb-0">
          {expGenerateFormField({ formFields, setFormFields })}
        </div>

        <button className="button-primary my-8 w-full">
          {formData?.submit_btn_txt ||
            `${t('components.common_components.form_builder.form_layout_2.txt_subscribe')}`}
        </button>
      </form>
    </div>
  );
};

export default ExpFormLayoutTwo;
