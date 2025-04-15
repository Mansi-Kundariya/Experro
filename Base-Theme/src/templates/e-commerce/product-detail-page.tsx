import { ExpProductdetail } from '../../components/e-commerce/product-detail';
/* eslint-disable*/
// TODO: Disabled eslint due to component is not used anywhere

export interface ProductDetailPageProps {
  pageData: any;
  components: any;
}

const ProductDetailPage = (props: ProductDetailPageProps) => {
  const { pageData, components } = props;
  return (
    <div>
      <ExpProductdetail product={pageData} components={components} />
    </div>
  );
};
export default ProductDetailPage;
