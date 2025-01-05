import { BrowserRouter, Routes, Route } from "react-router";
import { routes, TRoute } from "~/shared/router/router";

const RoutesProvider = () => {
  const renderRoutes = (routes: TRoute[]) => {
    return (
      <>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.Element}>
            {route.childrens && route.childrens.length > 0 && (
              <>{renderRoutes(route.childrens)}</>
            )}
          </Route>
        ))}
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default RoutesProvider;
