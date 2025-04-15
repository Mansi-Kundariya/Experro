import ExpCompareButtonController from './compare-button-controller';

const ExpCompareButton = () => {
  const { handleProductCompreButtonClick, skuArr } =
    ExpCompareButtonController();

  return (
    <>
      {skuArr.length > 0 && (
        <button
          onClick={handleProductCompreButtonClick}
          className="button-secondary mr-4">
          Compare ({skuArr.length})
        </button>
      )}
    </>
  );
};

export default ExpCompareButton;
