import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'experro-storefront';

interface ExpPaginationWithQueryParamsControllerProps {
  skip: number;
  totalCount: number;
  itemList: any;
  changeQueryParamFilter: any;
  setPageNumber: any;
  enableScrollViewOnClick: boolean;
}

/**
 * Controller component for pagination using query parameters.
 * @param skip - The number of items to skip in the pagination.
 * @param totalCount - The total count of items.
 * @param itemList - The list of items to paginate.
 * @param changeQueryParamFilter - A function to change the query parameter filter.
 * @param setPageNumber - A function to set the current page number.
 * @param enableScrollViewOnClick - A flag indicating whether to enable scrolling to top on page click.
 * @returns An object containing functions and data for controlling the pagination.
 */
const ExpPaginationWithQueryParamsController = (
  props: ExpPaginationWithQueryParamsControllerProps
) => {
  const {
    skip,
    totalCount,
    itemList,
    changeQueryParamFilter,
    setPageNumber,
    enableScrollViewOnClick,
  } = props;

  const [queryParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [paginationPageControl, setPaginationPageControl] = useState<{
    isLoadNumbers: boolean;
    pages: any[];
  }>({
    isLoadNumbers: false,
    pages: [],
  });

  const managePaginationForDesktopView = useCallback(
    (totalCount: number) => {
      const pageNo: any = queryParams.get('from') || 1;

      if (totalCount > 0) {
        const totalPages = Math.ceil(totalCount / skip);
        setTotalPages(totalPages);
        if (totalPages > 1) {
          let startPage = 1;
          if (totalPages > 5 && pageNo > 3) {
            startPage = pageNo - 2;
          }
          let pagesToShow = totalPages;
          if (pagesToShow > 5) {
            pagesToShow = 5;
          }
          let pages: Array<string | number | undefined> = Array(pagesToShow)
            .fill(1)
            // eslint-disable-next-line array-callback-return,@typescript-eslint/ban-ts-comment
            // @ts-expect-error
            .map((x, i) => {
              if (i + startPage <= totalPages) {
                return i + startPage;
              }
            })
            .filter((elem: number | undefined) => elem);
          if (totalPages > 5) {
            if (+pageNo === 4) {
              pages.unshift(1);
            } else if (+pageNo > 4) {
              pages = [...[1, '...'], ...pages];
            }
            if (+pageNo === totalPages - 3) {
              pages.push(totalPages);
            } else if (+pageNo <= totalPages - 4) {
              pages = [...pages, ...['...', totalPages]];
            }
          }
          setPaginationPageControl({ ...paginationPageControl, pages: pages });
        } else
          setPaginationPageControl({ ...paginationPageControl, pages: [1] });
      } else setPaginationPageControl({ ...paginationPageControl, pages: [] });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemList, paginationPageControl?.isLoadNumbers]
  );

  const managePaginationForMobileView = useCallback(
    (totalCount: number) => {
      const pageNo: any = queryParams.get('from') || 1;

      if (totalCount > 0) {
        const totalPages = Math.ceil(totalCount / skip);
        setTotalPages(totalPages);
        if (totalPages > 1) {
          let startPage = 1;
          if (totalPages > 3 && pageNo > 1) {
            startPage = pageNo - 1;
          }
          let pagesToShow = totalPages;
          if (pagesToShow > 3) {
            pagesToShow = 3;
          }
          let pages: Array<string | number | undefined> = Array(pagesToShow)
            .fill(1)
            // eslint-disable-next-line array-callback-return,@typescript-eslint/ban-ts-comment
            // @ts-expect-error
            .map((x, i) => {
              if (i + startPage <= totalPages) {
                return i + startPage;
              }
            })
            .filter((elem: number | undefined) => elem);
          if (totalPages > 3) {
            if (+pageNo === 3) {
              pages.unshift(1);
            } else if (+pageNo > 3) {
              pages = [...[1, '...'], ...pages];
            }
            if (+pageNo === totalPages - 2) {
              pages.push(totalPages);
            } else if (+pageNo <= totalPages - 2) {
              pages = [...pages, ...['...', totalPages]];
            }
          }
          setPaginationPageControl({ ...paginationPageControl, pages: pages });
        } else
          setPaginationPageControl({ ...paginationPageControl, pages: [1] });
      } else setPaginationPageControl({ ...paginationPageControl, pages: [] });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemList, paginationPageControl?.isLoadNumbers]
  );

  const handleNextPageClick = () => {
    const tempPageNumber = queryParams.get('from') || 1;
    if (+tempPageNumber === totalPages) return;
    changeQueryParamFilter({ from: +tempPageNumber + 1 });
  };

  const handlePreviousPageClick = () => {
    const tempPageNumber = queryParams.get('from') || 1;
    if (+tempPageNumber === 1) return;
    changeQueryParamFilter({ from: +tempPageNumber - 1 });
  };

  const handlePageNumberClick = (number: any, index: number) => {
    if (isNaN(parseInt(number))) {
      setPaginationPageControl({
        ...paginationPageControl,
        isLoadNumbers: !paginationPageControl?.isLoadNumbers,
      });
      if (index === 1) {
        const from = queryParams.get('from') || 1;
        const page = Math.ceil(+from / 2);
        changeQueryParamFilter({ from: page });
      } else {
        const from = queryParams.get('from') || 1;
        const page = Math.ceil((+from + totalPages) / 2);
        changeQueryParamFilter({ from: page });
      }
      return;
    } else {
      changeQueryParamFilter({ from: number });
    }
  };

  useEffect(() => {
    if (enableScrollViewOnClick) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
    }
    if (window.innerWidth > 768) {
      managePaginationForDesktopView(totalCount);
    } else {
      managePaginationForMobileView(totalCount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    totalCount,
    itemList,
    paginationPageControl?.isLoadNumbers,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    queryParams.get('from') || 1,
  ]);

  useEffect(() => {
    const pageNumber: any = queryParams.get('from');
    if (pageNumber) {
      setPageNumber(pageNumber);
    }else{
      setPageNumber(pageNumber ? pageNumber : 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.get('from')]);

  return {
    handleNextPageClick,
    handlePreviousPageClick,
    handlePageNumberClick,
    paginationPageControl,
    pageNumber: queryParams.get('from'),
  };
};

export { ExpPaginationWithQueryParamsController };
