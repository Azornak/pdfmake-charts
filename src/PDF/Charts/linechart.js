import Chart from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import { generateCanvas, getTitleConfig } from "./helpers";

Chart.register(annotationPlugin);

// How smooth the lines should be> cubic interpolation
const CHART_TENSION = 0.4;
// If it should color the area under the lines
const CHART_FILL_LINES = false;

/**
 * Line chart format
  
  {
    limits: [
      {value: number}
    ]
    data: 
    [
     {
      label: string
      data: [Array<number>]
     }
    ]
  }
  
 */

/**
 * Generates a Line chart and returns the Chartjs instance
 * @returns retunrs the line chart instance
 */
export function getLineChart(chartData) {
  const canvasRef = generateCanvas();
  return createChart(canvasRef, chartData);
}

/**
 * Gets the maximum length between all data sets
 * @returns the maximum length of all data sets. dafault 0
 */
function getDataMaxLength(data) {
  let dataLength = 0;
  for (const dataSet of data) {
    if (dataSet.data.length > dataLength) {
      dataLength = dataSet.data.length;
    }
  }
  return dataLength;
}

/**
 *  Generates an N string array
 *  ["1", "2".....]
 * @param nlabels number of labels to generate
 * @returns
 */
function generateLabels(nlabels) {
  const labels = [];
  for (let i = 0; i < nlabels; ++i) {
    labels.push(i.toString());
  }
  return labels;
}

/**
 * Creates and returns a string representation of a
 * rgba value. An optional opacity can be provided, defauls to 0.4
 *
 * @returns random rgba color
 */
function getRandomRgbaColor(opacity = 0.4) {
  var r = Math.floor(Math.random() * 200);
  var g = Math.floor(Math.random() * 200);
  var b = Math.floor(Math.random() * 200);
  return `rgba(${r},${g},${b},${opacity})`;
}

/**
 * Sets some default settings on each dataset to be displayed
 * @returns mutated data object
 */
function setDatasetSettings(data) {
  return data.map((set) => {
    set.fill = CHART_FILL_LINES;
    set.tension = CHART_TENSION;
    set.borderColor = getRandomRgbaColor();
    return set;
  });
}

/**
 * Array of limit objects
 * [{value: X}]
 * @returns object of limit lines
 */
function createLimits(limits) {
  function getLineConfig(value) {
    return {
      // https://www.chartjs.org/chartjs-plugin-annotation/samples/types/line.html
      type: "line",
      scaleID: "y",
      borderWidth: 2,
      borderColor: "#ff000030",
      value: value,
    };
  }
  const limitLines = {};
  for (const limit of limits) {
    limitLines[`limit-${limit.value}`] = getLineConfig(limit.value);
  }
  return limitLines;
}

function createChart(canvas, chartData) {
  const datasets = setDatasetSettings(chartData.datasets);
  const chart = new Chart(canvas, {
    type: "line",
    data: {
      labels: generateLabels(getDataMaxLength(chartData.datasets)),
      datasets,
    },

    options: {
      color: "black",
      responsive: true,
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        annotation: {
          // This comes from a plugin: https://www.chartjs.org/chartjs-plugin-annotation
          annotations: createLimits(chartData.limits),
        },
        title: {
          display: false,
        },
      },
      scales: {
        xAxis: {
          display: false,
        },
        x: {
          labels: [],
          display: true,
          title: getTitleConfig(chartData.xAxisTitle),
        },
        y: {
          title: getTitleConfig(chartData.yAxisTitle),
        },
      },
      annotation: {},
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
