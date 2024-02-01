export default function ReqUrl({ selected, setSelected, handleSendApi }) {
  return (
    <div>
      <div>
        <select
          defaultValue={selected.method}
          onChange={(e) => {
            selected.method = e.target.value;
            setSelected({ ...selected });
          }}
        >
          <option value="get">GET</option>
          <option value="post">POST</option>
          <option value="delete">DELETE</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          value={selected.url}
          onChange={(e) => {
            selected.url = e.target.value;
            setSelected({ ...selected });
          }}
        />
      </div>
      <div>
        <button onClick={handleSendApi}>Send</button>
      </div>
    </div>
  );
}
