import Chart from "chart.js/auto";
import { generateCanvas, getTitleConfig } from "./helpers";

/**
 * Generates a bar chart and returns the Chartjs instance
 * @returns retunrs the line chart instance
 */
export function getBarChart(chartData) {
  const canvasRef = generateCanvas();
  return createChart(canvasRef, chartData);
}

/**
 * Set background color, border color, border width on
 * each datasets for altering the visuals of bars.
 * This returns a new array of datasets and do not mutate old objects.
 * @param {object} datasets
 * @returns
 */
function setBarStyle(datasets) {
  return datasets.map((dataset) => {
    return {
      ...dataset,
      backgroundColor: ["rgb(48, 156, 170)"],
      borderColor: ["rgb(48, 156, 170)"],
      borderWidth: 1,
    };
  });
}

function createChart(canvasRef, chartData) {
  const datasets = setBarStyle(chartData.datasets);
  const chart = new Chart(canvasRef, {
    type: "bar",
    data: {
      labels: chartData.labels,
      datasets: datasets,
    },
    options: {
      scales: {
        x: {
          title: getTitleConfig(chartData.xAxisTitle),
        },
        y: {
          title: getTitleConfig(chartData.yAxisTitle),
        },
      },

      /**
       * Animations has to be disabled to be able to get the chart base64 image.
       * Or else we have to use promises/callbacks for the animation to finish before
       * we are able to aquire the image e.g it will be blank before.
       */
      animation: false,
    },
  });
  return chart;
}
