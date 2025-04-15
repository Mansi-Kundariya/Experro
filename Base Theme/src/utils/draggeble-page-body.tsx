import { memo } from 'react';
import { DraggableArea } from 'experro-storefront';

/**
 * This component is used as the wrapper of the Draggable area for blog-detail as in blog detail state manipulation is going on, which makes
 * component dropped in draggable area getting re-rendered and making un-necessary API call. Using memo we are preventing it.
 * @param pageData
 * @param components
 * @param draggableAreaId
 * @constructor
 */
const ExpDraggablePageBody = ({
  pageData,
  components,
  draggableAreaId,
}: {
  pageData: any;
  components: any;
  draggableAreaId: string;
}) => {
  return (
    <>
      <DraggableArea
        style={{ width: 'auto' }}
        cssClass={''}
        id={draggableAreaId}
        components={components}
        modelField={''}
        pageData={pageData}
      />
    </>
  );
};

export default memo(ExpDraggablePageBody);
