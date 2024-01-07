import React from "react";

export default function Loading({ loadingMessage }) {
  return (
    <div
      className="p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 max-w-40"
      role="alert"
    >
      <span className="font-medium">{loadingMessage}</span>
    </div>
  );
}
