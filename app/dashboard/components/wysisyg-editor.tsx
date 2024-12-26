"use client";

import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill-styles.css"; // Add a custom stylesheet for additional styles

import { useQueryClient } from "@tanstack/react-query";

type WYSIWYGFormProps<T> = {
  text?: string,
  btnRef?: React.RefObject<HTMLButtonElement>;
  keyz: string;
  types: keyof T; // Dynamic keyz based on the provided type
  toolbar?: any[]
};

export const WYSIWYGForm = <T extends Record<string, any>>({
  btnRef,
  text,
  keyz,
  types,
  toolbar
}: WYSIWYGFormProps<T>) => {
  const [content, setContent] = useState<string>("");
  const queryClient = useQueryClient()

  const toolbarOptions = toolbar?.length ? toolbar : [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["link", "image"], // Link and image buttons

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }], // Lists
    [
      { align: "" }, // Left-align
      { align: "center" }, // Center-align
      { align: "right" }, // Right-align
      { align: "justify" }, // Justify-align
    ],
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
  ];

  const modules = {
      toolbar:  toolbarOptions,
  };

  useEffect(() => {
    if(text) {
        setContent(text)
    }
  }, [])

  useEffect(() => {
    queryClient.setQueryData([keyz], (old: T) =>
        old
          ? {
            ...old,
            [types]: content,
          }
          : {
            [types]: content,
          }
      );
  }, [content])

  return (
    <div className="editor-container rounded-t-2xl rounded-b-2xl border overflow-hidden border-[#DDEEE5]">
      <ReactQuill
        modules={modules}
        theme="snow"
        value={content}
        onChange={(e) => setContent(e)}
      />
    </div>
  );
};
