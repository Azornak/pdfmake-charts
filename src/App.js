import './App.css';
import pdfGen from './PDF/pdfgenerator';
import imgUrl from './images/lambda.png';

function App() {


  const downloadPDF = async (pdfType) => {
    console.log("Download PDF clicked");

    // Code to load test image. When loading charts we generate the charts with chartjs and use canvas -> toDataURI to get the image
    // This should be separated into own file, e.g. calling getLinechart(data)
    let blob = await fetch(imgUrl).then(res =>  res.blob());
    console.log(blob);
    let dataUrl = await new Promise(resolve => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    const data = {
      heading: ["test1", "test2", "test3", "test4"],
      imageTest: dataUrl
    };
    pdfGen(pdfType, data);
  }

  return (
    <div className="App">
      <button onClick={() => downloadPDF('testpdf')} >Download PDF</button>
    </div>
  );
}

export default App;
