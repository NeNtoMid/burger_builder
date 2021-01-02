import { useCallback } from 'react';

import { useSelector } from 'react-redux';

import { useHistory, useRouteMatch } from 'react-router-dom';

const useCheckout = () => {
  const history = useHistory();

  const match = useRouteMatch();

  const ings = useSelector((state) => state.ings.ingredients);

  const goToPrevPageHandler = useCallback(() => {
    history.goBack();
  }, [history]);

  const goToNextPageHandler = useCallback(() => {
    history.replace(`${match.url}/contacts`);
  }, [history, match]);

  return { match, ings, goToPrevPageHandler, goToNextPageHandler };
};

export default useCheckout;
