export default interface SignupInterface {
  firstName: string,
  lastName: string,
  middleName?: string
  email: string,
  password: string,
  phone: string,
  company: string,
  customFields?: Array<CustomFieldInterface>
  gctoken?: string
  formFields?: Array<formFieldsInterface>
}

export interface CustomFieldInterface {
  fieldId: string,
  fieldValue: string | number
}
export interface formFieldsInterface {
  name: string,
  value: string | number
}
