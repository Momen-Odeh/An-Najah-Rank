import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense } from "react";
import PageLayout from "./Layout/PageLayout";
import { routes, generateRoutes } from "./Utils/Utils";
import NotFound from "./Components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BaseURI from "./Utils/BaseURI";
import Cookies from "js-cookie";
import Loader from "./Components/Loader";
function App() {
  axios.defaults.baseURL = BaseURI;
  // axios.defaults.params = {
  //   token: cookies.token,
  // };
  axios.defaults.headers.common["Authorization"] = Cookies.get("token");
  axios.defaults.headers.post["Content-Type"] = "application/json";
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<PageLayout />}>{generateRoutes(routes)}</Route>
    )
  );

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Suspense>
  );
}

export default App;
