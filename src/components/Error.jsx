import React from "react";

export default function Error({ errorMessage }) {
  return (
    <div
      className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 max-w-40"
      role="alert"
    >
      <span className="font-medium">{errorMessage}</span>
    </div>
  );
}
