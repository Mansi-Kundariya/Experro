export const removeHtmlTags = (htmlString: any) => {
  const tempElement: any = document.createElement('div');
  // eslint-disable-next-line no-unsanitized/property
  tempElement.innerHTML = htmlString;
  const extractedText = tempElement.textContent || tempElement.innerText;
  return extractedText;
};
