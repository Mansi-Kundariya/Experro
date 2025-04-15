import ExpBrandLandingPage from '../../components/e-commerce/listing-page/brand-page';

export interface BrandPageProps {
  pageData: any;
  components: any;
}
const BrandPage = (props: BrandPageProps) => {
  const { pageData, components } = props;

  return (
    <div>
      <ExpBrandLandingPage pageData={pageData} components={components} />
    </div>
  );
};

export default BrandPage;
