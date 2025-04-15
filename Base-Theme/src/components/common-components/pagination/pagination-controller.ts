import { useCallback, useEffect, useState } from 'react';

interface ExpPaginationControllerProps {
  itemList: any;
  totalCount: number;
  setPageNumber: any;
  skip: number;
  pageNumber: string | number;
  enableScrollViewOnClick: boolean;
}

/**
 * Controller component for pagination using useStates.
 * @param skip - The number of items to skip in the pagination.
 * @param totalCount - The total count of items.
 * @param itemList - The list of items to paginate.
 * @param setPageNumber - A function to set the current page number.
 * @param pageNumber - A variable of useState.
 * @param enableScrollViewOnClick - A flag indicating whether to enable scrolling to top on page click.
 * @returns An object containing functions and data for controlling the pagination.
 */
const ExpPaginationController = (props: ExpPaginationControllerProps) => {
  const {
    itemList,
    totalCount,
    setPageNumber,
    skip,
    pageNumber,
    enableScrollViewOnClick,
  } = props;

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
      const pageNo: any = pageNumber;

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
      const pageNo: any = pageNumber;

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
    const tempPageNumber = pageNumber;
    if (+tempPageNumber === totalPages) return;
    setPageNumber(+tempPageNumber + 1);
  };

  const handlePreviousPageClick = () => {
    const tempPageNumber = pageNumber;
    if (+tempPageNumber === 1) return;
    setPageNumber(+tempPageNumber - 1);
  };

  const handlePageNumberClick = (number: any, index: number) => {
    if (isNaN(parseInt(number))) {
      setPaginationPageControl({
        ...paginationPageControl,
        isLoadNumbers: !paginationPageControl?.isLoadNumbers,
      });
      if (index === 1) {
        const from = pageNumber;
        const page = Math.ceil(+from / 2);
        setPageNumber(page);
      } else {
        const from = pageNumber;
        const page = Math.ceil((+from + totalPages) / 2);
        setPageNumber(page);
      }
      return;
    } else setPageNumber(parseInt(number));
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      managePaginationForDesktopView(totalCount);
    } else {
      managePaginationForMobileView(totalCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, itemList, paginationPageControl?.isLoadNumbers, pageNumber]);

  useEffect(() => {
    if (enableScrollViewOnClick) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
    }
    setPageNumber(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return {
    handleNextPageClick,
    handlePreviousPageClick,
    handlePageNumberClick,
    paginationPageControl,
    pageNumber,
  };
};

export { ExpPaginationController };
