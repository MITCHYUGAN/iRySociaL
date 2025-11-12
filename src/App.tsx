import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "./features/Dark_LightMode/theme-provider";
import Home from "./pages/Home";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Videos from "./pages/Videos";
import Posts from "./pages/Post";
import Articles from "./pages/Articles";

const router = createBrowserRouter([
  {
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <Home /> },
      { path: "/posts", element: <Posts /> },
      { path: "/articles", element: <Articles /> },
      { path: "/videos", element: <Videos /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex w-full">
        <Navbar />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
