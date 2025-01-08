import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { supabase } from "./supabaseClient";

const TextEditor: React.FC = () => {
  const [entryId, setEntryId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "", // Initial empty content
    autofocus: true,
    parseOptions: {
      preserveWhitespace: "full",
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setWordCount(editor.getText().split(" ").filter(Boolean).length);

      // Save the content to Supabase
      autoSave(content);
    },
  });

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Fetch or create an entry for the user
  useEffect(() => {
    const fetchEntry = async () => {
      const { data: entries, error: entryError } = await supabase
        .from("entries")
        .select("*")
        .eq("user_id", "123e4567-e89b-12d3-a456-426614174000");

      const entry = entries?.[0];

      if (entryError) {
        // If no entry exists, create one
        const { data: newEntry, error: newEntryError } = await supabase
          .from("entries")
          .insert([
            { user_id: "123e4567-e89b-12d3-a456-426614174000", content: "" },
          ])
          .single();

        if (newEntryError) {
          console.error("Error creating new entry:", newEntryError);
          return;
        }

        setEntryId(newEntry.id);
        editor?.commands.setContent(newEntry.content);
      } else {
        // If entry exists, load it
        setEntryId(entry.id);
        editor?.commands.setContent(entry.content);
      }
    };

    fetchEntry();
  }, [editor]);

  // Autosave functionality
  const autoSave = async (content: string) => {
    if (!entryId) return;

    setIsSaving(true);

    const { error } = await supabase
      .from("entries")
      .update({
        content,
        user_id: "123e4567-e89b-12d3-a456-426614174000",
        word_count: wordCount,
      })
      .eq("id", entryId);

    if (error) console.error("Error saving entry:", error);

    setIsSaving(false);
  };

  // Determine the color based on the word count
  const getColorClass = () => {
    if (wordCount >= 750) {
      return "text-green-500";
    } else if (wordCount >= 500) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 grid grid-rows-2 gap-4 h-full">
      {/* EditorContent API: https://tiptap.dev/docs/editor/api/editor */}
      <EditorContent
        editor={editor}
        className={`prose prose-lg b-none rounded custom-editor-content m-none font-weight-700 w-full`}
      />
      <div className="flex justify-between items-end mb-2 mt-2">
        <p className="text-sm text-gray-500">
          {isSaving ? "Saving..." : "Saved"}
        </p>
        <p className={`text-sm text-gray-500 ${getColorClass()}`}>
          Word Count: {wordCount}
        </p>
      </div>
    </div>
  );
};

// Add CSS class to target ProseMirror-focused class inside EditorContent
const styles = `
.prose {
    max-width: 100%;
}
.ProseMirror {
    font-weight: 500;
    caret-color: #805ad5;
    caret-shape: block;
    caret-width: 2px;
}
    .ProseMirror::selection {
    background: transparent;
    border-left: 5px solid #805ad5; /* Change the width of the caret */
}
  .ProseMirror-focused {
    outline: none;
  }
`;

export default TextEditor;
