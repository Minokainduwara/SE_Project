import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#BB22AA", "#44CC88", "#CC8844", "#FF6666", "#33AAFF"];

export default function ReportChart({ data }) {
  if (!data.length) return <p>No chart data to display.</p>;

  return (
    <PieChart width={500} height={500} margin={{ top: 50, bottom: 40 }}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="55%"
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  );
}
