import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { SongContextProvider } from "./features/home/Song.context";

import "./styles/global.scss";

const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  );
};

export default App;
