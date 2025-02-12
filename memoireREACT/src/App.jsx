import Profile from "./pages/profile/profile.jsx";
import Home from "./pages/home/home.jsx"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx"
import Register from "./pages/register/register.jsx";

function App() {

  const Layout = () => {
    return (
      <div>
        <Navbar />
          <div style={{ flex: 6 }}>
            <Outlet />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
          <Layout />
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:username",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;