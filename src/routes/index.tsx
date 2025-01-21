import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink">
          Welcome to Type 750
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Your daily mental relief. Write 750 words every day to clear your mind and find peace.
        </p>
      </header>
      <main className="flex flex-col items-center">
        <Link
          to="/new"
          className="bg-pink text-white px-6 py-3 rounded-full text-lg mb-4"
        >
          Start Your Mental Detox
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
