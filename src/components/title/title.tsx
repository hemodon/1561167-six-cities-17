import { Helmet } from 'react-helmet-async';
import { DEFAULT_PREFIX_TITLE, TypesTitle } from '../../const';
import { TypesPageEnum } from '../../types/types';

type TitleProps = {
  typesPage: TypesPageEnum;
  isEmpty?: boolean;
};

function Title({ typesPage, isEmpty = false }: TitleProps): JSX.Element {
  const extension = isEmpty ? ' empty' : '';
  return (
    <Helmet>
      <title>{`${DEFAULT_PREFIX_TITLE} ${TypesTitle[typesPage]}${extension}`}</title>
    </Helmet>
  );
}

export { Title };