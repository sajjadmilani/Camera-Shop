import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import GlobalProvider from "./components/GlobalContext";
import { Auth0Provider } from "@auth0/auth0-react";
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
