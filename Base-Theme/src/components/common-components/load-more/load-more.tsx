import { ExpLoadMoreController } from './load-more-controller';

export interface LoadMore {
  limit: number;
  skip: number;
  total_count: number;
  load_more_message?: 'Load More' | 'Show More';
  setSkip: any;
}

const ExpLoadMore = (props: LoadMore) => {
  const {
    limit,
    skip,
    total_count,
    load_more_message = 'Load More',
    setSkip,
  } = props;

  const { handleLoadMore, showLoadMoreButton } = ExpLoadMoreController({
    total_count,
    limit,
    skip,
    setSkip,
  });

  return (
    <>
      {showLoadMoreButton && (
        <div className="product-list-load-more text-center">
          <button
            className="button button-small"
            onClick={handleLoadMore}
            dangerouslySetInnerHTML={{ __html: load_more_message }}
          />
        </div>
      )}
    </>
  );
};

export default ExpLoadMore;
