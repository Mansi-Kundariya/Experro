// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useEffect, useRef, useState } from 'react';

interface ExpProductTabSectionControllerProps {
  brand_esi: string;
  description_eti: string;
  categories_esai: string;
  calculated_price_efi: number;
  inventory_tracking_esi: string;
  inventory_level_eii: number;
  sku_esi: string;
  sku_for_analytics_esli: any;
  name_esi: string;
  provider_id_esi: string;
}

const ExpProductTabSectionController = ({
  product,
}: {
  product: ExpProductTabSectionControllerProps;
}) => {
  const [selectedTab, setSelectedTab] = useState<string>('description');
  const reviewTabRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product?.description_eti) {
      setSelectedTab('details');
    }
    const eventListenerFunction = async () => {
      setSelectedTab('Customer Reviews');
      setTimeout(() => {
        if (reviewTabRef && reviewTabRef.current) {
          reviewTabRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 10);
    };
    document.addEventListener('REVIEW_TAB', eventListenerFunction);
    return () => {
      document.removeEventListener('REVIEW_TAB', eventListenerFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTabChange = (value: string) => {
    tabRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    if (value === selectedTab) {
      setSelectedTab('');
    } else {
      setSelectedTab(value);
    }
  };

  return {
    selectedTab,
    onTabChange,
    reviewTabRef,
    tabRef,
  };
};

export default ExpProductTabSectionController;
