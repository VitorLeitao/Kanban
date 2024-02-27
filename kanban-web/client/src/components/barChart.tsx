import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

interface BarChartProps {
  numberToDo: number;
  numberDone: number;
  numberInProgress: number;
}

const BarChart: React.FC<BarChartProps> = ({ numberToDo, numberDone, numberInProgress }) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: ['TODO', 'DONE', 'IN PROGRESS']
      },
    },
    series: [{
      name: 'series-1',
      data: [numberToDo, numberDone, numberInProgress]
    }]
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
