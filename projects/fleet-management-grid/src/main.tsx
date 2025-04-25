import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './app/app';
import { routes } from "./app/app-routes";

const basename = import.meta.env.VITE_BASENAME || '/';
const router = createBrowserRouter([
  {
    element: <App />,
    children: [...routes]
  }
],
{
  basename: basename
});

createRoot(document.getElementById('root')!).render(

    <RouterProvider router={router} />

)
