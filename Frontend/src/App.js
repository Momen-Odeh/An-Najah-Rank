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
function App() {
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
    </Suspense>
  );
}

export default App;
