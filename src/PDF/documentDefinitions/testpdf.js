import { table, headers, chapters, blocks, utils } from "./components";
import profile, { pdfConfig } from "../profileConfig";
import { footer } from "./components/footer";
import { header } from "./components/header";

var docDefinition = (data) => {
  console.dir(data);
  return {
    footer: function (currentPage, pageCount) {
      return [footer];
    },
    header: function (currentPage, pageCount, pageSize) {
      return [header];
    },
    ...pdfConfig,
    content: [
      { text: "-------- COMPONENTS" },
      blocks.createCheckboxesComponent([
        { checked: true, label: "yes" },
        { checked: false, label: "no" },
        { checked: true, label: "absolutely" },
      ]),
      utils.createSeperatorLine(
        profile.CHAPTER_LINE_HEIGHT,
        profile.SEPERATOR_LINE_COLOR
      ),
      utils.createSeperatorLine(
        profile.SUB_CHAPTER_LINE_HEIGHT,
        profile.SEPERATOR_LINE_COLOR,
        100
      ),
      utils.createSeperatorLine(
        profile.SUB_CHAPTER_LINE_HEIGHT,
        profile.SEPERATOR_LINE_COLOR,
        50
      ),
      utils.createSeperatorLine(
        profile.DATA_POINT_LINE_HEIGHT,
        profile.SEPERATOR_LINE_COLOR,
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
