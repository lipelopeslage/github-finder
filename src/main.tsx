import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from "./routes/Home.tsx";
import Repos from "./routes/Repos.tsx";

const router = createBrowserRouter([
  {
    path: "/github-finder",
    element: <App />,
    children: [
      {
        path: "/github-finder/",
        element: <Home />,
      },
      {
        path: "/github-finder/repos/:username",
        element: <Repos />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
