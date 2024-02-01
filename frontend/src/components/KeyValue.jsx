import React from "react";

export default function KeyValue({
  index,
  handleDelete,
  handleKeyChange,
  handleValueChange,
}) {
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="key"
          onChange={(e) => {
            handleKeyChange(e.target.value, index);
          }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="value"
          onChange={(e) => {
            handleValueChange(e.target.value, index);
          }}
        />
      </div>
      <button
        onClick={() => {
          handleDelete(index);
        }}
      >
        Delete
      </button>
    </div>
  );
}
