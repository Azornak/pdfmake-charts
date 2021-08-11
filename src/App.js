import pdfGen from "./PDF/pdfgenerator";
import "./App.css";
import { getLineChart } from "./PDF/Charts/linechart";
import {
  lineChartDummyData,
  lineChartDummyData2,
} from "./PDF/Charts/lineChartDummyData";
import { useEffect, useRef } from "react";
import { getBarChart } from "./PDF/Charts/barchart";
import { barChartDummyData } from "./PDF/Charts/barChartDummyData";
function App() {
  console.log("Download PDF clicked");
  const iframeRef = useRef(null);
  useEffect(() => {
    const downloadPDF = async (pdfType) => {
      const dataUrl = getLineChart(lineChartDummyData);
      const dataUrl2 = getLineChart(lineChartDummyData2);
      const dataUrl3 = getBarChart(barChartDummyData);

      const pdfData = {
        heading: ["test1", "test3", "test3", "test4"],
        imageTest: dataUrl.toBase64Image(),
        chartData: [
          { x: "label", y: 123 },
          { x: "label", y: 123 },
          { x: "label", y: 123 },
          { x: "label", y: 123 },
        ],
      };
      pdfGen(pdfType, iframeRef.current, pdfData);
    };
    downloadPDF();
  }, []);

  return (
    <div className="App">
      <iframe ref={iframeRef} style={{ width: "100vw", height: "100vh" }} />
    </div>
  );
}

export default App;
