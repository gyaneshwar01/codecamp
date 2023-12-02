"use client";

interface IPdfReaderProps {
  fileId: string;
}

export const PdfReader = ({ fileId }: IPdfReaderProps) => {
  const fileUrl = `https://utfs.io/f/${fileId}.pdf`;
  return (
    <div className="flex flex-col h-full bg-secondary">
      <h1 className="text-3xl text-blue-800">{fileUrl}</h1>
    </div>
  );
};
