import React from "react";
import TextEditor from "./TextEditor";

const App: React.FC = () => {
  return (
    <div className="h-full p-4">
      <h1 className="font-bold text-purple-700 text-center my-6">Type 750</h1>
      <TextEditor />
    </div>
  );
};

export default App;
