import { SetStateAction } from "react";
import { ContentLibraryTraitDataInterface } from "../interfaces/content-library.interace";

export const handelEditDataOfContentLibraryFromUiBuilder = (
  traitData: ContentLibraryTraitDataInterface,
  setTraitData: { (value: SetStateAction<ContentLibraryTraitDataInterface>): void; (arg0: any): void; },
  event: string
) => {
  if (event) {
    const parsedContentModel = JSON.parse(event);
    if (typeof parsedContentModel?.editDataFlag === 'boolean') {
      parsedContentModel.editDataFlag = !parsedContentModel?.editDataFlag;
    } else {
      parsedContentModel['editDataFlag'] = false;
    }
    setTraitData({
      ...traitData,
      ['contentModel']: JSON.stringify(parsedContentModel),
    });
  }
};
