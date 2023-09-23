import { Outlet } from "react-router-dom";
function PageLayout() {
  return (
    <div>
      <h1>Header</h1>
      <Outlet />
      <h1>Footer</h1>
    </div>
  );
}

export default PageLayout;
