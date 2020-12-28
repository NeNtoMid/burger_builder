import React, { Fragment } from 'react';

const contactForm = (props) => {
  return (
    <Fragment>
      <form>
        <div>
          <label>Name</label>
          <input type='text' id='name' onChange={props.updateCredentials} />
        </div>
        <div>
          <label>Surname</label>
          <input type='text' id='surname' onChange={props.updateCredentials} />
        </div>
        <div>
          <label>Adress</label>
          <input type='text' id='adress' onChange={props.updateCredentials} />
        </div>
      </form>

      <button onClick={props.pay}>Go to pay</button>
    </Fragment>
  );
};

export default contactForm;
