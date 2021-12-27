import "@patternfly/react-core/dist/styles/base.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import store from "./store";
import NotificationsPortal from "./Utilities/NotificationsPortal";

const RootApp: React.FC<Record<string, never>> = () => (
  <Provider store={store}>
    <Router>
      <NotificationsPortal />
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(
  <RootApp />,
  document.getElementById('root')
);
