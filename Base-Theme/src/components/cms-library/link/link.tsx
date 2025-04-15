import { CommonUtilities } from 'experro-storefront';

export interface ExpLinkProps {
  title: string;
  href: string;
  target: string;
  linkText: string;
}

/**
 * Renders a Link component.
 * @param props - The Link component props.
 * @returns Rendered Link component.
 */
const ExpLink = (props: ExpLinkProps) => {
  const { title, href, target, linkText } = CommonUtilities.propsParser(props);
  return (
    <div>
      <a href={href} target={target} title={title}>
        {linkText ? linkText : 'Link'}
      </a>
    </div>
  );
};

export default ExpLink;
