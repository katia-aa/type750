import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { supabase } from "../supabaseClient";
import { getColorClass } from "./utils/getColorClass";
import "./styles/texteditor.css";
import { startOfDay, endOfDay, formatISO } from "date-fns";

type EntryResponse = {
  data: { id: string; content: string } | null;
  error: any;
};

// Get start and end of the current day in ISO format
const startOfToday = formatISO(startOfDay(new Date()));
const endOfToday = formatISO(endOfDay(new Date()));

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
      autoSave(content);
    },
  });

  // Fetch or create an entry for the user
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        // Attempt to Fetch today's entry
        const { data: todayEntries, error: todayEntryError } = await supabase
          .from("entries")
          .select("*")
          .eq("user_id", "123e4567-e89b-12d3-a456-426614174000")
          .gte("created_at", startOfToday)
          .lt("created_at", endOfToday);

        const todayEntry = todayEntries?.[0];

        // If today's entry exists, then set the id for autosave and set the content
        if (todayEntry) {
          setEntryId(todayEntry.id);
          editor?.commands.setContent(todayEntry.content);
          return;
        }

        if (todayEntryError) {
          console.error("Error fetching today's entry:", todayEntryError);
        }

        // If no entry exists, create an empty entry
        const { data: newEntry, error: newEntryError } = (await supabase
          .from("entries")
          .insert([
            {
              user_id: "123e4567-e89b-12d3-a456-426614174000",
              content: "",
            },
          ])
          .single()) as EntryResponse;

        if (newEntryError) {
          console.error("Error creating new entry:", newEntryError);
        }

        if (newEntry) {
          setEntryId(newEntry.id);
          editor?.commands.setContent(newEntry.content);
        }
      } catch (error) {
        console.error("Error fetching or creating entry:", error);
      }
    };

    fetchEntry();
  }, [editor]);

  // Autosave functionality
  const autoSave = async (content: string) => {
    if (!entryId) return;

    setIsSaving(true);

    const payload = {
      content,
      word_count: wordCount,
    };

    const { error } = await supabase
      .from("entries")
      .update(payload)
      .eq("id", entryId);

    if (error) console.error("Error saving entry:", error);

    setIsSaving(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 h-full flex flex-col">
      <h1 className="font-bold text-pink mt-0 text-base">Type 750</h1>
      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto">
        <EditorContent
          editor={editor}
          className="prose prose-lg b-none rounded custom-editor-content m-none font-weight-700 w-full"
        />
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center font-bold">
        <p className="text-sm text-gray-500">
          {isSaving ? "Saving..." : "Saved"}
        </p>
        <p className={`text-sm text-gray-500 ${getColorClass(wordCount)}`}>
          Word Count: {wordCount}
        </p>
      </div>
    </div>
  );
};

export default TextEditor;
