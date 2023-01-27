import JoditEditor from "jodit-react";
import { useRef } from "react";

const config = {
  buttons: [
    "bold",
    "underline",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "paragraph",
    "|",
    "align",
    "undo",
    "redo",
    "|",
  ],
  spellcheck: false,
};

const RichTextEditor = ({ setValue, value }) => {
  const editor = useRef(null);
  return (
    <JoditEditor
      value={value}
      ref={editor}
      onChange={(content) => setValue(content)}
    />
  );
};

export default RichTextEditor;
