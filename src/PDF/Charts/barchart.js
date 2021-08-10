import Chart from "chart.js/auto";
import { generateCanvas } from "./helpers";

/**
 * Generates a bar chart and returns the Chartjs instance
 * @returns retunrs the line chart instance
 */
export function getBarChart(chartData) {
  const canvasRef = generateCanvas();
  return createChart(canvasRef, chartData);
}

function createChart(canvasRef, chartData) {
  console.log(chartData.datasets);
  const chart = new Chart(canvasRef, {
    type: "bar",
    data: {
      labels: ["a", "2"],
      datasets: chartData.datasets,
    },
    options: {
      scales: {
        y: { labels: "e", title: "test", display: true, position: "top" },
      },
    },
    /**
     * Animations has to be disabled to be able to get the chart base64 image.
     * Or else we have to use promises/callbacks for the animation to finish before
     * we are able to aquire the image e.g it will be blank before.
     */
    animation: false,
  });
  console.log(chart);
  return chart;
}
