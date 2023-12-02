"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import axios from "axios";
import { FileIcon, X } from "lucide-react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "pdfUploader";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => {
            onChange("");
          }}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url); // After onChange is called, value stores the url of the image
        const config = {
          headers: {
            "x-api-key": "sec_iY5xsXDmgmQ93ea8XHbciw3NTQ4BIeEk",
            "Content-Type": "application/json",
          },
        };

        const data = {
          url: res?.[0].url,
        };
        axios
          .post("https://api.chatpdf.com/v1/sources/add-url", data, config)
          .then((response) => {
            localStorage.setItem("source_id", response.data.sourceId);
          })
          .catch((error) => {
            console.log("Error:", error.message);
            console.log("Response:", error.response.data);
          });
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
