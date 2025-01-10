import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  basepath: "/type750", // Match your `base` in Vite
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
