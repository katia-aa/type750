import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-700">
          Welcome to Type 750
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Your daily writing companion. Write 750 words every day and track your
          progress.
        </p>
      </header>
      <main className="flex flex-col items-center">
        <Link
          to="/new"
          className="bg-purple-700 text-white px-6 py-3 rounded-full text-lg mb-4"
        >
          Start Writing
        </Link>
        {/* <Link
          to="/progress"
          className="bg-gray-700 text-white px-6 py-3 rounded-full text-lg"
        >
          View Progress
        </Link> */}
      </main>
      <footer className="mt-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Type 750. All rights reserved.</p>
      </footer>
    </div>
  );
}
