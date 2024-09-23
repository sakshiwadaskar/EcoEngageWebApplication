import React from "react"; // Import React library for JSX syntax
import { RouterProvider } from "react-router-dom"; // Import RouterProvider from react-router-dom to provide routing context
import ReactDOM from "react-dom/client"; // Import ReactDOM from react-dom for rendering
import routes from "./router.ts"; // Import the routing configuration
import { Provider } from "react-redux"; // Import the Provider component from react-redux for state management
import { store } from "./store"; // Import the store from the store.ts file
import "./index.css"; // Import index.css file for global styles
import { I18nextProvider } from "react-i18next"; // Import i18nextProvider for Internalisation
import i18n from "./i18n";

// Render the application
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={routes}></RouterProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode> // Close strict mode wrapper
);
