import React, { Fragment } from 'react';

import Modal from './../../components/UI/Modal/Modal';

import useWithErrorHandler from './../../hooks/withErrorHandler/useWithErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const { error, leaveErrorHandler } = useWithErrorHandler(axios);

    return (
      <Fragment>
        <Modal show={error} modalClosed={leaveErrorHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />;
      </Fragment>
    );
  };
};
export default withErrorHandler;
