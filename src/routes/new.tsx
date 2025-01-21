import { createFileRoute } from "@tanstack/react-router";
import TextEditor from "../TextEditor";
import { useAuth } from "../AuthProvider";

const NEW = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    <div className="min-h-screen p-8 h-full flex flex-col">
      <TextEditor />
    </div>
  );
};

export const Route = createFileRoute("/new")({
  component: NEW,
});
