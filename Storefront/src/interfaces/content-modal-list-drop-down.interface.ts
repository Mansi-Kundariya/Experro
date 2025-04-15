export interface ExpContentModelListDropDownProps {
  value: string;
  changeHandler(field: string, event: React.FormEvent<HTMLInputElement> | string): void;
  modelInternalName: string;
}

export interface ContentModelListInterface {
  title: string;
  content_model_id?: string;
  content_model_name: string;
  current_version_name: string;
  published_version_name: string;
  id: string;
  current_version_id: string;
}
