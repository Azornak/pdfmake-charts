const DOCUMENT_WIDTH = 555;
const CHAPTER_LINE_HEIGHT = 5;
const SUB_CHAPTER_LINE_HEIGHT = 3;
const DATA_POINT_LINE_HEIGHT = 1;

function createSeperatorLine(height, percentWidth = 100) {
  if (percentWidth > 100 || percentWidth < 1) percentWidth = 100;
  const width = (percentWidth / 100) * DOCUMENT_WIDTH;
  return {
    svg: `<svg width="${width}" height="${
      height + 5
    }"> <rect width="100%" height="${height}" style="fill:rgb(85, 210, 233);" /> </svg>`,
  };
}

var docDefinition = (data) => {
  console.log("Inserting data to PDF", data);
  return {
    pageSize: "A4",
    pageMargins: [20, 20, 20, 20],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
      },
    },
    content: [
      {
        text: "01-processing site",
        style: "header",
      },
      createSeperatorLine(CHAPTER_LINE_HEIGHT, 100),
      {
        layout: "lightHorizontalLines", // optional

        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ["*", "auto", 100, "*"],

          body: [
            [
              data.heading[0],
              data.heading[1],
              data.heading[2],
              data.heading[3],
            ],
            ["Value 1", "Value 1", "Value 3", "Value 4"],
            [{ text: "Bold value", bold: true }, "Val 2", "Val 3", "Val 4"],
          ],
        },
      },
      { image: data.imageTest, width: 500 },
    ],
  };
};

export default docDefinition;
