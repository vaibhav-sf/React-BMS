import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Suspense } from "react";
import { BookProvider } from "./context/BookContext";

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-500 text-sm">
        Loading...
      </p>
    </div>
  </div>
);

const App = () => {
  return (
    <BookProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </BookProvider>
  );
};

export default App;