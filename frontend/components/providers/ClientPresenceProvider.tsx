"use client";

import { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
  fileId: string | null;
}

const ClientPresenceProvider: React.FC<IProps> = ({ children, fileId }) => {
  useEffect(() => {
    const userData = localStorage.getItem("user");

    const deleteThoseChats = async (idOfFile: string) => {
      const response = await fetch("/api/chats", {
        method: "DELETE",
        body: JSON.stringify({ fileId: idOfFile }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Couldn't delete the messages !!");
      }
    };

    if ((userData === null || userData === "left") && fileId !== null) {
      localStorage.setItem("user", fileId);
    }

    if (fileId === null && userData !== null && userData !== "left") {
      deleteThoseChats(userData).then(() => {
        localStorage.setItem("user", "left");
      });
    }
  }, [fileId]);

  return <div>{children}</div>;
};

export default ClientPresenceProvider;
