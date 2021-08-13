import { table, headers, chapters, blocks, utils } from "./components";
const DOCUMENT_WIDTH = 555;
const CHAPTER_LINE_HEIGHT = 5;
const SUB_CHAPTER_LINE_HEIGHT = 3;
const DATA_POINT_LINE_HEIGHT = 0.5;
const SEPERATOR_LINE_COLOR = "#55D2E9";
//
const HISTOGRAM_HELPER_TABLE_HEADER_COLOR = "#309CAA";
const HISTOGRAM_HELPER_TABLE_HEADER_TEXT_COLOR = "#FFFFFF";
const HISTOGRAM_HELPER_TABLE_N1_ROW_COLOR = "#E9EBF5";
const HISTOGRAM_HELPER_TABLE_N2_ROW_COLOR = "#CFD5EA";
const HISTOGRAM_HELPER_TABLE_BORDER_COLOR = "#FFF";
//
const DATA_TABLE_HEADER_COLOR = "#7F7F7F";
const DATA_TABLE_HEADER_TEXT_COLOR = "#FFFFFF";
const DATA_TABLE_ROW_COLOR = "#F2F2F2";
const DATA_TABLE_BORDER_COLOR = "#FFF";
//
const TITLE_MARGINS = [1, 15, 0, 3];
const DATA_POINT_TEXT_MARGINS = [1, 3, 0, 3];
const TABLE_MARGINS = [0, 15, 0, 0];
const TABLE_TEXT_MARGINS = [0, 5, 2, 5];
var docDefinition = (data) => {
  console.dir(data);
  return {
    footer: function (currentPage, pageCount) {
      const p = currentPage.toString() + " of " + pageCount;
      const now = new Date();
      return {
        text: p + " - " + now.toDateString(),
        alignment: "center",
      };
    },
    header: function (currentPage, pageCount, pageSize) {
      // you can apply any logic and return any valid pdfmake element

      return [];
    },
    pageSize: "A4",
    pageMargins: [20, 20, 20, 20],
    styles: {
      header: {
        bold: true,
        margin: TITLE_MARGINS,
      },
      subHeader: {
        bold: false,
        margin: TITLE_MARGINS,
      },
      dataPointHeader: {
        bold: false,
        margin: TITLE_MARGINS,
      },
      tableHeader: {
        bold: true,
        color: DATA_TABLE_HEADER_TEXT_COLOR,
        border: [true, true, true, true],
        margin: TABLE_TEXT_MARGINS,
      },
      tableRow: {
        border: [true, true, true, true],
        margin: TABLE_TEXT_MARGINS,
      },
    },
    content: [
      { text: "-------- COMPONENTS" },
      blocks.createCheckboxesComponent([
        { checked: true, label: "yes" },
        { checked: false, label: "no" },
        { checked: true, label: "absolutely" },
      ]),
      utils.createSeperatorLine(CHAPTER_LINE_HEIGHT, SEPERATOR_LINE_COLOR),
      utils.createSeperatorLine(
        SUB_CHAPTER_LINE_HEIGHT,
        SEPERATOR_LINE_COLOR,
        100
      ),
      utils.createSeperatorLine(
        SUB_CHAPTER_LINE_HEIGHT,
        SEPERATOR_LINE_COLOR,
        50
      ),
      utils.createSeperatorLine(
        DATA_POINT_LINE_HEIGHT,
        SEPERATOR_LINE_COLOR,
        100
      ),
      chapters.createChapterSeperator("01-Main section"),
      chapters.createSubChapterSeperator("01.01-Subsection"),
      chapters.createDataPointSeperator("A datapoint seperator"),
      blocks.createDataPointTextComponent({
        title: "Process",
        content: "100kg",
      }),
      table.createCageTable([
        ["1", "1-3", "22:30", "22:30", "12345", "1234567", "12.3"],
        ["1", "1-3", "22:30", "22:30", "12345", "1234567", "12.3"],
      ]),
      table.createCageCommentTable([
        ["1", "abcdef"],
        ["1", "abcdef"],
        ["1", "abcdef"],
      ]),
      table.createThrowTable([
        [
          "1",
          "1",
          "kulerekke",
          "12:00",
          "12:00",
          "12:00",
          "123",
          "12345",
          "123456",
          "1234",
        ],
        [
          "1",
          "1",
          "kulerekke",
          "12:00",
          "12:00",
          "12:00",
          "123",
          "12345",
          "123456",
          "1234",
        ],
        [
          "1",
          "1",
          "kulerekke",
          "12:00",
          "12:00",
          "12:00",
          "123",
          "12345",
          "123456",
          "1234",
        ],
      ]),
      table.createCommentBlock(
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, ofciis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque"
      ),
      table.createProcessNotesTable([
        [
          "Throw",
          "22/03/2021 12:55",
          " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, ofciis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ",
        ],
      ]),
      { text: "-------- END OF COMPONENTS", margin: [0, 0, 0, 30] },
      chapters.createChapterSeperator("01-Processing site"),
      {
        layout: "noBorders",
        table: {
          headerRows: 1,
          widths: ["*", "*", "*"],

          body: [
            [
              blocks.createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
              blocks.createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
              blocks.createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
            ],
            [
              blocks.createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
              blocks.createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
              blocks.createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
            ],
          ],
        },
      },
      blocks.createHistogramTableComponents({
        title: "RSW - temperatures",
        graph: data.barChart1,
        table: {
          titles: ["size", "qty"],
          data: [
            ["1", "2"],
            ["3", "4"],
            ["3", "2"],
          ],
        },
      }),
      utils.breakPage(),
      blocks.createImageComponent({
        title: "A process overview",
        image: data.lineChart1,
      }),
      blocks.createCheckboxDataPoint({
        title: "Blood water delivered",
        checkboxes: [
          { checked: true, label: "yes" },
          { checked: false, label: "no" },
        ],
      }),
    ],
  };
};

export default docDefinition;
