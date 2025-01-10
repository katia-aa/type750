import { createFileRoute } from "@tanstack/react-router";
import TextEditor from "../TextEditor";

export const Route = createFileRoute("/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8">
      <h1 className="font-bold text-purple-700 text-center my-6">Type 750</h1>
      <TextEditor />
    </div>
  );
}
