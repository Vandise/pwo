import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'Redux/store';
import * as Constants from 'Root/constants';
import * as dom from 'Util/dom';

import FormManager from 'Game/ui/forms';

import Style from 'Game/ui/styles/main';

const EL = dom.globals.document.getElementById(Constants.UI_MOUNT_ID);

export default ReactDOM.render(
  <Provider store={store}>
    <FormManager />
  </Provider>, EL
);