import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";

import "./styles/global.scss";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
