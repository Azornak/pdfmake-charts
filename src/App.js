import pdfGen from "./PDF/pdfgenerator";
import "./App.css";
import { getLineChart } from "./PDF/Charts/linechart";
import {
  lineChartDummyData,
  lineChartDummyData2,
} from "./PDF/Charts/lineChartDummyData";
import { useEffect } from "react";
import { getBarChart } from "./PDF/Charts/barchart";
import { barChartDummyData } from "./PDF/Charts/barChartDummyData";
function App() {
  console.log("Download PDF clicked");

  useEffect(() => {
    const dataUrl = getLineChart(lineChartDummyData);
    const dataUrl2 = getLineChart(lineChartDummyData2);
    const dataUrl3 = getBarChart(barChartDummyData);
  }, []);

  const downloadPDF = async (pdfType) => {
    const dataUrl = getLineChart(lineChartDummyData);
    const dataUrl2 = getLineChart(lineChartDummyData2);
    const pdfData = {
      heading: ["test1", "test2", "test3", "test4"],
      imageTest: dataUrl.toBase64Image(),
      chartData: [
        { x: "label", y: 123 },
        { x: "label", y: 123 },
        { x: "label", y: 123 },
        { x: "label", y: 123 },
      ],
    };
    pdfGen(pdfType, pdfData);
  };

  return (
    <div className="App">
      <button onClick={() => downloadPDF("testpdf")}>Download PDF</button>
    </div>
  );
}

export default App;
