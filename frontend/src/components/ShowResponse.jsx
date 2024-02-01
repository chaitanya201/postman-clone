export default function ShowResponse({ response }) {
  return response && response.data ? (
    <div>
      <ul>
        <li>Data</li>
        <li>Headers</li>
        <li>Cookies</li>
      </ul>
      <ul>
        <li>{JSON.stringify(response.data)}</li>
        <li>{JSON.stringify(response.headers)}</li>
        <li>Add cookies</li>
      </ul>
    </div>
  ) : (
    <div>No data</div>
  );
}
