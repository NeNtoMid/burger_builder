import React, { Fragment, Suspense, memo } from 'react';

import { Route, withRouter } from 'react-router-dom';

import Spinner from './../../components/UI/Spinner/Spinner';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';

import useCheckout from './../../hooks/Checkout/useCheckout';

const ContactData = React.lazy(() => import('./ContactData/ContactData'));

const Checkout = (props) => {
  const {
    match,
    ings,
    goToPrevPageHandler,
    goToNextPageHandler,
  } = useCheckout();

  return (
    <Fragment>
      <CheckoutSummary
        prev={goToPrevPageHandler}
        next={goToNextPageHandler}
        ingredients={ings}
      />
      <Route
        path={`${match.url}/contacts`}
        exact
        render={() => (
          <Suspense fallback={<Spinner />}>
            <ContactData />
          </Suspense>
        )}
      />
    </Fragment>
  );
};

export default memo(withRouter(Checkout));
