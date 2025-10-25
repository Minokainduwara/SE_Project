export default function ReportTable({ columns, data }) {
  if (!data.length) return <p>No data to display.</p>;

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.accessor}
              className="border px-4 py-2 bg-gray-100 text-left"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {columns.map((col) => (
              <td key={col.accessor} className="border px-4 py-2">
                {row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
