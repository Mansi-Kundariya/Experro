interface ExpLoadMoreControllerProps {
  skip: number;
  limit: number;
  total_count: number;
  setSkip: any;
}

const ExpLoadMoreController = (props: ExpLoadMoreControllerProps) => {
  const { skip, limit, total_count, setSkip } = props;

  const showLoadMoreButton = !(skip + limit > total_count);

  const handleLoadMore = () => {
    setSkip(skip + limit);
  };

  return { showLoadMoreButton, handleLoadMore };
};
export { ExpLoadMoreController };
