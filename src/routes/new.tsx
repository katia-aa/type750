import { createFileRoute } from "@tanstack/react-router";
import TextEditor from "../TextEditor";

export const Route = createFileRoute("/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen p-8 h-full flex flex-col">
      <TextEditor />
    </div>
  );
}
