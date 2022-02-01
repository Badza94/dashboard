import Chart from "react-apexcharts";
type TPieChartProps = {
  data: number[];
  labels: string[];
};
function PieChart({ data, labels }: TPieChartProps) {
  return (
    <Chart
      options={{
        labels: labels,
        legend: {
          position: "top",
        },

        colors: ["#A259FF", "#F24E1E", "#FFC107", "#6497B1"],
      }}
      series={data}
      type="pie"
      width={"540px"}
    />
  );
}
export default PieChart;
