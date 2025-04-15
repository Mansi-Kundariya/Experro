import React from 'react';
import { useParams } from 'react-router-dom';
import { Page } from './page';

const RedirectPageRouter = ({templates, components}: { templates: any; components: any }) => {
  const pageSlugParams= useParams();
  const key = Object.values(pageSlugParams).join('-');
  return (
      <Page templates={templates} components={components} key={key}/>
  );
};

export  { RedirectPageRouter };
