import { ExpFormBuilderField } from "../interface";

const mediaValidation = (event: any, formField: ExpFormBuilderField, __updatedFormField: ExpFormBuilderField) => {
    const files = event.target.files;
    //Check file size
    if (files && formField.properties?.isAllowMultipleFileUploads) {
        let fileSize: number = Array.from(files).reduce(
            (previouseFileSize: number, file: any) =>
                previouseFileSize + file?.size,
            0
        );
        if (fileSize > 0) {
            fileSize = fileSize / 1048576;
        }

        __updatedFormField['value'] = files;
        __updatedFormField['isValidInput'] = true;

        if (
            formField.properties?.mediaMaximumFiledUploadSize &&
            fileSize > formField.properties?.mediaMaximumFiledUploadSize
        ) {
            __updatedFormField[
                'validationMessage'
            ] = `Uploaded file size exceeds, maximum file size allowed is ${formField.properties.mediaMaximumFiledUploadSize} MB`;
            __updatedFormField['isValidInput'] = false;
        }
        if (
            formField.properties?.mediaFileUploadLimit &&
            formField.properties?.isAllowMultipleFileUploads &&
            files?.length > formField.properties?.mediaFileUploadLimit
        ) {
            __updatedFormField[
                'validationMessage'
            ] = `Maximum files reached! You can only upload ${formField.properties?.mediaFileUploadLimit} files at a time.`;
            __updatedFormField['isValidInput'] = false;
        }
        return __updatedFormField;
    } else {
        if (files) {
            const uploadedFileSize = files[0]?.size / 1048576;
            if (
                formField.properties?.mediaMaximumFiledUploadSize &&
                uploadedFileSize >
                formField.properties.mediaMaximumFiledUploadSize
            ) {
                __updatedFormField[
                    'validationMessage'
                ] = `Uploaded file size exceeds, maximum file size allowed is ${formField.properties.mediaMaximumFiledUploadSize}`;
            } else {
                __updatedFormField['value'] = files;
                __updatedFormField['isValidInput'] = true;
            }
        }
        return __updatedFormField;
    }
}

export { mediaValidation };