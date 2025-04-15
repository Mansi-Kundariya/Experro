import { CommonUtilities } from 'experro-storefront';
import { ExpPrepareSchema } from './prepare-schema-by-type';

export interface SchemaPageType {
  type: 'Product' | 'Category' | 'Search' | 'Blog' | 'Cart' | 'FAQ';
  data: any;
  id?: string;
}

/**
 * This hook is responsible for injecting the schema script into the head tag based on the provided type.
 * @param {SchemaPageType} type - The schema type to be injected.
 */
export const schemaInjector = (props: SchemaPageType) => {
  const { type, data, id } = props;

  const schema_obj: any = prepareSchemaByType({ type, data });
  if (type === 'FAQ') {
    handleSchemaScriptAddRemove(schema_obj, id);
  } else {
    if (data && schema_obj) {
      handleSchemaScriptAddRemove(schema_obj);
    }
  }
};

/**
 *This function is responsible for adding the script to the head tag, and when
 */
function handleSchemaScriptAddRemove(schema_obj_data: any, id?: string) {
  if (!CommonUtilities.isRenderingOnServer()) {
    /**
     * Here we are just removing the script which alredy exists.
     */
    const existing_schema_script = document.getElementById('exp_schema_set');
    if (existing_schema_script) {
      document.head.removeChild(existing_schema_script);
    }
    /**
     * Here we are adding the script with updated schema data.
     */
    const schema_script = document.createElement('script');
    schema_script.id = id?.length ? id : 'exp_schema_set';
    schema_script.type = 'application/ld+json';
    schema_script.innerText = schema_obj_data;
    document.head.appendChild(schema_script);
  }
}

/**
 * This function is responsible for generating the schema object according to the specified 'type'.
 * The data structure will vary depending on the type provided.
 * @param {string} type - The schema type to be created.
 * @param {object} data - The data used to build the schema object.
 */
function prepareSchemaByType(props: SchemaPageType) {
  const { type, data } = props;
  switch (type) {
    case 'Product':
      return ExpPrepareSchema.prepareProductSchema(data);
    case 'Category':
      return ExpPrepareSchema.prepareCategorySchema(data);
    case 'Search':
      return ExpPrepareSchema.prepareSearchSchema(data);
    case 'Blog':
      return ExpPrepareSchema.prepareBlogSchema(data);
    case 'Cart':
      return ExpPrepareSchema.prepareCategorySchema(data);
    case 'FAQ':
      return ExpPrepareSchema.prepareFAQSchema(data);
    default:
      return {};
  }
}
