import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignInSide from "./pages/SignInSide";
import SignUpSide from "./pages/SignUpSide";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import CampaignPage from "./pages/CampaignPage.tsx";
import feedPage from "./pages/FeedPage.tsx";
import EmissionsPage from "./pages/EmissionsPage.tsx";
import RegisterEvents from "./pages/RegisterEvents.tsx";


// Define routes using createBrowserRouter from react-router-dom
const routes = createBrowserRouter([
  {
    path: '/', // Root path
    Component: App, // Main component for the root path
    children: [
      {
        Component: LandingPage, // Component for the root path (index route)
        index: true, // Set as index route
      },
      {
        path: '/signIn',
        Component: SignInSide, // Component for the root path (index route)
        index: true // Set as index route
      },
      {
        path: '/signUp', // Route for sign up page
        Component: SignUpSide // Component for sign up page
      },
      {
        path: '/changePassword',
        Component: ForgotPassword,
      },
      {
        path: '/myProfile',  // Route for user's profile detail page
        Component: (!localStorage.getItem("token")) ? SignInSide : UserProfilePage // Component for profile detail page
      },
      {
        path: '/landingPage',  // Route for user's profile detail page
        Component: LandingPage // Component for profile detail page
      },
      {
        path: '/treeCampaignPage',  // Route for user's profile detail page
        Component: CampaignPage // Component for profile detail page
      },
      {
        path: '/feed',  // Route for feed page
        Component: (!localStorage.getItem("token")) ? SignInSide : feedPage  // Component for feed page
      },
      {
        path: '/emissions',
        Component: EmissionsPage
      },
      {
        path: '/registerEvents',
        Component: (!localStorage.getItem("token")) ? SignInSide : RegisterEvents
      }
    ]
  }
]);

export default routes; // Export routes for use in the application
