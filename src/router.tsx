import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "./layouts/MainLayout";

const Dashboard = lazy(
  () => import("./pages/Dashboard")
);

const Books = lazy(
  () => import("./pages/Books")
);

const BookDetails = lazy(
  () => import("./pages/BookDetails")
);

const AddBook = lazy(
  () => import("./pages/AddBook")
);

const EditBook = lazy(
  () => import("./pages/EditBook")
);

const NotFound = lazy(
  () => import("./pages/NotFound")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "books",
        element: <Books />,
      },

      {
        path: "books/add",
        element: <AddBook />,
      },

      {
        path: "books/:id",
        element: <BookDetails />,
      },

      {
        path: "books/edit/:id",
        element: <EditBook />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;