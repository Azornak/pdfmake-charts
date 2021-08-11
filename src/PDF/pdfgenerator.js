import testPDF from "./documentDefinitions/testpdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfGenerator = (pdfType, iframe, data) => {
  console.log("Generating PDF");
  var dd = {};
  switch (pdfType) {
    case "testPDF":
      dd = testPDF(data);
      break;
    default:
      dd = testPDF(data);
  }
  //   console.log("Starting download");
  //   pdfMake.createPdf(dd).download();

  const pdfDoc = pdfMake.createPdf(dd);
  pdfDoc.getDataUrl((dataUrl) => {
    iframe.src = dataUrl;
  });
};

export default pdfGenerator;
