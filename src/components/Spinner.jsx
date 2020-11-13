import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
const Spinner = () => {
  return (
    <Dimmer active>
      <Loader size="huge" content="Loading" />
    </Dimmer>
  );
};

export default Spinner;
