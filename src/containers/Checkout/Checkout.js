import React, { Fragment, Suspense } from 'react';

import { Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import Spinner from './../../components/UI/Spinner/Spinner';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';

const ContactData = React.lazy(() => import('./ContactData/ContactData'));

const Checkout = (props) => {
  const goToPrevPageHandler = () => {
    props.history.goBack();
  };

  const goToNextPageHandler = () => {
    props.history.replace(`${props.match.url}/contacts`);
  };

  return (
    <Fragment>
      <CheckoutSummary
        prev={goToPrevPageHandler}
        next={goToNextPageHandler}
        ingredients={props.ings}
      />
      <Route
        path={`${props.match.url}/contacts`}
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

const mapStateToProps = (state) => {
  return { ings: state.ings.ingredients };
};

export default connect(mapStateToProps)(withRouter(Checkout));
