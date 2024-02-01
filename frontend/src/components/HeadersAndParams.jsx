import KeyValue from "./KeyValue";

export default function HeadersAndParams({
  type = "headers",
  selected,
  setSelected,
}) {
  const handleKeyChange = (keyText, index) => {
    selected[type][index].key = keyText;
    setSelected({ ...selected });
  };
  const handleValueChange = (valueText, index) => {
    selected[type][index].value = valueText;
    setSelected({ ...selected });
  };

  const handleAdd = () => {
    selected[type].push({ key: "", value: "" });
    setSelected({ ...selected });
  };

  const handleDelete = (index) => {
    selected[type] = selected[type].filter((item, idx) => idx !== index);
    setSelected({ ...selected });
  };

  return (
    <div>
      <h3>{type}</h3>
      <div>
        <button onClick={handleAdd}>Add</button>
      </div>
      {selected[type].map((item, index) => {
        return (
          <KeyValue
            key={`${index}`}
            handleDelete={handleDelete}
            handleKeyChange={handleKeyChange}
            handleValueChange={handleValueChange}
            index={index}
          />
        );
      })}
    </div>
  );
}
