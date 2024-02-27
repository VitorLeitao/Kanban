import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

interface LineChartProps {
  data: { date: string; number: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-line'
      },
      xaxis: {
        categories:  data.map(item => item.date)
      },
    },
    series: [{
      name: 'Numbers',
      data: data.map(item => item.number) // Usa os números como dados da série
    }]
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
