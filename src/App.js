import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// layout

import Main, { mainLoader } from "./layout/Main";

//react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Route
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";

//action
import { logoutAction } from "./actions/logoutAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement : <ErrorPage/>,
    children : [
      {
        index : true,
        element: <Dashboard/>,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement : <ErrorPage/>,
      },
      {
        path : 'logout',
        action : logoutAction,
        errorElement : <ErrorPage/>,
      },
    ]
  },
]);

function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
    </div>
  );
}

export default App;
