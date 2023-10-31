import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-ggml232sn2fcanxw.us.auth0.com"
        clientId="wKTZCaxrUtNbMYpGPut2TWBqzE4kAS1B"
        authorizationParams={{
          redirect_uri: window.location,
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>
);
