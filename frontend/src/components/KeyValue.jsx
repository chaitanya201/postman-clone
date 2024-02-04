import React from "react";

export default function KeyValue({
  index,
  handleDelete,
  handleKeyChange,
  handleValueChange,
  defaultValue,
}) {
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="key"
          value={defaultValue.key}
          onChange={(e) => {
            handleKeyChange(e.target.value, index);
          }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="value"
          value={defaultValue.value}
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
