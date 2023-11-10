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
import { useCookies } from "react-cookie";
function App() {
  const [cookies] = useCookies();
  axios.defaults.baseURL = BaseURI;
  // axios.defaults.params = {
  //   token: cookies.token,
  // };
  axios.defaults.headers.common["Authorization"] = cookies.token;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<PageLayout />} errorElement={<NotFound />}>
        {generateRoutes(routes)}
      </Route>
    )
  );

  return (
    <Suspense fallback={<>Loading</>}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Suspense>
  );
}

export default App;
