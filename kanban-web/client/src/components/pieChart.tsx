import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

interface PieChartProps {
  numberToDo: number;
  numberDone: number;
  numberInProgress: number;
}

const PieChart: React.FC<PieChartProps> = ({ numberToDo, numberDone, numberInProgress }) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-pie'
      },
      labels: ['TODO', 'DONE', 'IN PROGRESS'],
    },
    series: [numberToDo, numberDone, numberInProgress]
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="pie"
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
