import { checkboxSVG, seperatorLineSVG } from "../assets/svgs";
import { checkBoxCheckedSVG, checkBoxSVG } from "./checkbox";
import { tableHelper } from "./tableHelpers";

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
const DATA_POINT_TEXT_MARGINS = [1, 3, 0, 3];
const TABLE_MARGINS = [0, 15, 0, 0];
const TABLE_TEXT_MARGINS = [2, 3, 2, 3];

/****************************
 * TEXT COMPONENTS
 ****************************/

function createSectionHeader(text) {
  return { text, style: "header" };
}
function createSubsectionHeader(text) {
  return { text, style: "subHeader" };
}
function createDataPointHeader(text) {
  return { text, style: "dataPointHeader" };
}

const headers = {
  createSectionHeader,
  createSubsectionHeader,
  createDataPointHeader,
};

/****************************
 * UTILITY COMPONENTS
 ****************************/

/**
 * Breaks the page before this definition
 * @returns text definition object with break before
 */
function breakPage() {
  return { text: "", pageBreak: "before" };
}

/**
 * Creates a SVG line component with provided height and width of document.
 * The default width is 100% of the document.
 * Values below 1 or above 100 will be converted to 100%
 * @param {number} height height of the line
 * @param {number} percentWidth percentage of document width 1-100
 * @returns returns an svg line component definition
 */
function createSeperatorLine(height, color, percentWidth = 100) {
  if (percentWidth > 100 || percentWidth < 1) percentWidth = 100;
  const width = (percentWidth / 100) * DOCUMENT_WIDTH;
  return {
    svg: seperatorLineSVG(width, height, color),
  };
}

const utils = {
  breakPage,
  createSeperatorLine,
};

/****************************
 * CHAPTER COMPONENTS
 ****************************/

/**
 * Creates a stack object definition with the provided textobject (title) and
 * a sub component under the title for seperation/visual.
 * @param {object} textObjectDefinition text object definition
 * @param {object} seperatorDefinition seperator object definition
 * @returns stack object definition with text and seperator
 */
function createChapterDefinition(
  textObjectDefinition,
  seperatorLineDefinition
) {
  return {
    stack: [textObjectDefinition, seperatorLineDefinition],
  };
}

/**
 * Creates a chapter seperator component definition
 * It contains a text element and a seperator line.
 * @param {string} chapterTitle the title of the chapter
 * @returns chapter seperator definition object
 */
function createChapterSeperator(chapterTitle, width = 100) {
  return createChapterDefinition(
    createSectionHeader(chapterTitle),
    createSeperatorLine(CHAPTER_LINE_HEIGHT, SEPERATOR_LINE_COLOR, width)
  );
}

/**
 * Creates a subchapter seperator component definition
 * It contains a text element and a seperator line.
 * @param {string} subChapterTitle the title of the subchapter
 * @returns subchapter seperator definition object
 */
function createSubChapterSeperator(subChapterTitle, width = 100) {
  return createChapterDefinition(
    createSubsectionHeader(subChapterTitle),
    createSeperatorLine(SUB_CHAPTER_LINE_HEIGHT, SEPERATOR_LINE_COLOR, width)
  );
}

/**
 * Creates a datapoint seperator component definition
 * It contains a text element and a seperator line.
 * @param {string} dataPointTitle the title of the data point
 * @returns datapoint seperator definition object
 */
function createDataPointSeperator(dataPointTitle, width = 100) {
  return createChapterDefinition(
    createDataPointHeader(dataPointTitle),
    createSeperatorLine(DATA_POINT_LINE_HEIGHT, SEPERATOR_LINE_COLOR, width)
  );
}

const chapters = {
  createChapterSeperator,
  createSubChapterSeperator,
  createDataPointSeperator,
};

/****************************
 * BLOCK COMPONENTS
 ****************************/

/**
 * Creates a datapoint definition object with a title , seperator line and component definition bellow it (e.g text, image etc).
 * It has a default width of 30% of document width
 * @param {object} dataPointConfig datapoint object with title and
 * @returns returns datapoint definition object
 */
function createDataPointComponent(dataPointConfig, width = 30) {
  const { title, component } = dataPointConfig;
  return {
    stack: [
      createDataPointHeader(title),
      createSeperatorLine(DATA_POINT_LINE_HEIGHT, SEPERATOR_LINE_COLOR, width),
      component,
    ],
  };
}

/**
 * Creates a datapoint component definition with a text definition as component bellow.
 * @param {object} textPointConfig object with title and content
 * @returns datapoint definition object with text bellow it
 */
function createDataPointTextComponent(textPointConfig) {
  const { title, content } = textPointConfig;

  const component = {
    text: content,
    margin: DATA_POINT_TEXT_MARGINS,
  };
  return createDataPointComponent({ title, component });
}

/**
 * Creates a histogram graph definition object with a helper table on the side of it and datapoint styling (Title, seperator line).
 * It contains a title, a graph image and a helper table for the graph.
 *
 * Graphconfig format:
 * {
 *   graph: string(base64 image),
 *   title: string,
 *   table: {titles: [string], data:[[string]]}
 * }
 * @param {object} graphConfig
 * @returns histogram definition object
 */
function createHistogramTableComponents(graphConfig) {
  const { graph, title, table } = graphConfig;

  const contentTable = {
    layout: "noBorders",
    table: {
      headerRows: 1,
      widths: ["65%", "*", "25%"],
      body: [
        [
          { image: graph, width: DOCUMENT_WIDTH * 0.65 },
          {}, //empty block for filling space so table is pushed to right edge.
          createGraphHelperTable(table),
        ],
      ],
    },
  };

  return createDataPointComponent({ title, component: contentTable }, 100);
}

/**
 * Creates a image definition object with datapoint styling (Title, seperator line).
 * It covers the whole page width.
 * imageConfig format:
 * {
 *   image: string(base64 image),
 *   title: string
 * }
 * @param {object} imageConfig
 * @returns image definition object
 */
function createImageComponent(imageConfig) {
  const { image, title } = imageConfig;
  const imageComponent = { image, width: DOCUMENT_WIDTH };
  return createDataPointComponent({ title, component: imageComponent }, 100);
}

/**
 * Creats a table with checkboxes and label text.
 * If a value is checked a checked checkbox is displayed, else an unchecked checkbox.
 *
 * checkBoxConfig Format:
 * [
 *   {
 *    checked: boolean,
 *    label: string
 *   }
 * ]
 * @param {object} checkboxesConfig checkboxes to create
 * @returns table of checkboxes definition object
 */
function createCheckboxesComponent(checkboxesConfig) {
  const checkboxes = [];

  for (const checkItem of checkboxesConfig) {
    checkboxes.push(
      { svg: checkItem.checked ? checkBoxCheckedSVG : checkBoxSVG },
      { text: checkItem.label }
    );
  }

  return {
    layout: "noBorders",
    table: {
      headerRows: 0,
      body: [checkboxes],
    },
  };
}

/**
 * Creates a checkbox data point definition object (Title, seperator line, and row of N checkboxes)
 * checkboxDataPointConfig format:
 * {
 *   title: string,
 *   checkboxes:
 *   [
 *     {
 *      checked: boolean,
 *      label: string
 *     }
 *   ]
 * }
 * @param {object} checkboxDataPointConfig con
 * @returns
 */
function createCheckboxDataPoint(checkboxDataPointConfig) {
  const { title, checkboxes } = checkboxDataPointConfig;
  const component = createCheckboxesComponent(checkboxes);
  return createDataPointComponent({ title, component });
}

const blocks = {
  createDataPointComponent,
  createDataPointTextComponent,
  createHistogramTableComponents,
  createImageComponent,
  createCheckboxesComponent,
  createCheckboxDataPoint,
};

/****************************
 * TABLE COMPONENTS
 ****************************/

/**
 * Creates a grapgh helper table to visualize value/label for
 * a histogram graph.
 * The provided object is in format 
 * {
 *  titles: [string, string,...]
    data: [ [string,string, ...], [string, string,...]]
 * }
 * @param {object} tableValues object of table data
 * @returns returns a table definition object
 */
function createGraphHelperTable(tableValues) {
  const { titles, data } = tableValues;
  const transformer = (column) => {
    return createTableBodyText(column, "center");
  };

  const tableDataComponents = tableHelper.transformTableRowText(
    data,
    transformer
  );

  const headers = titles.map((title) => {
    return tableHelper.createTableHeaderText(title, {
      alignment: "center",
      fill: HISTOGRAM_HELPER_TABLE_HEADER_COLOR,
    });
  });
  const table = {
    widths: ["*", "*"],
    alignment: "center",
    body: [headers, ...tableDataComponents],
  };
  return tableHelper.baseColorTable(table);
}

function createTableBodyText(text, alignment = "left") {
  return {
    text: text,
    alignment,
    style: "tableRow",
  };
}

/**
 * Creates a singl column comment table with a fixed header row with title:Comment, and
 * a single row with the provided comment text.
 * Returns the definiton object.
 * @param {string} commentText comment text to display
 * @returns comment table defintion object
 */
function createCommentBlock(commentText) {
  const body = [
    [tableHelper.createTableHeaderText("Comment")],
    [tableHelper.createTableRowText(commentText)],
  ];
  return tableHelper.baseDataTable({ body });
}

/**
 * Creats a table for throw data. It has 10 columns for each row.
 * @param {array} tableData values for the data rows
 * @returns table definition object
 */
function createThrowTable(tableData = []) {
  const header = (text) =>
    tableHelper.createTableHeaderText(text, { alignment: "center" });

  const transformer = (column) =>
    tableHelper.createTableRowText(column, { alignment: "center" });

  const tableDataComponents = tableHelper.transformTableRowText(
    tableData,
    transformer
  );

  const table = {
    headerRows: 2,
    body: [
      [
        {
          ...header(""),
          colSpan: 6,
        },
        {},
        {},
        {},
        {},
        {},
        {
          ...header("System estimated"),
          colSpan: 4,
        },
        {},
        {},
        {},
      ],
      [
        header("Cage [nr]"),
        header("Throw [nr]"),
        header("Tool type"),
        header("Start [HH:MM]"),
        header("Stop [HH:MM]"),
        header("Time [HH:MM]"),
        header("Pump Speed [rpm]"),
        header("Biomass [kg]"),
        header("Quantum [fish]"),
        header("Efficiency [fish/min]"),
      ],
      ...tableDataComponents,
    ],
  };
  return tableHelper.baseDataTable(table);
}

/**
 * Creats a table for cage data. It has 7 columns for each row.
 * @param {array} tableData values for the data rows
 * @returns table definition object
 */
function createCageTable(tableData = []) {
  const header = (text) =>
    tableHelper.createTableHeaderText(text, { alignment: "center" });

  const transformer = (column) =>
    tableHelper.createTableRowText(column, { alignment: "center" });

  const tableDataComponents = tableHelper.transformTableRowText(
    tableData,
    transformer
  );

  const table = {
    body: [
      [
        {
          ...header(""),
          colSpan: 4,
        },
        {},
        {},
        {},
        {
          ...header("System estimated"),
          colSpan: 3,
        },
        {},
        {},
      ],
      [
        header("From cage [nr]"),
        header("To RSW Tank [nr]"),
        header("Total Time [HH:MM:SS]"),
        header("Waiting [HH:MM:SS]"),
        header("Biomass [kg]"),
        header("Quantum [fish]"),
        header("Avg. Biomass [kg/fisk]"),
      ],
      ...tableDataComponents,
    ],
  };
  return tableHelper.baseDataTable(table);
}

/**
 * Creats a table for cage comments. It has 2 columns for each row.
 * @param {array} tableData values for the data rows
 * @returns table definition object
 */
function createCageCommentTable(tableData = []) {
  const transformer = (column, index) => {
    if (index === 0) {
      return tableHelper.createTableRowText(column, { alignment: "center" });
    }
    return tableHelper.createTableRowText(column);
  };

  const tableDataComponents = tableHelper.transformTableRowText(
    tableData,
    transformer
  );
  const table = {
    widths: ["auto", "*"],
    body: [
      [
        tableHelper.createTableHeaderText("Cage[nr]", { alignment: "center" }),
        tableHelper.createTableHeaderText("Comment"),
      ],
      ...tableDataComponents,
    ],
  };
  return tableHelper.baseDataTable(table, 1);
}

/**
 * Creats a table for process notes. It has 3 columns for each row.
 * @param {array} tableData values for the data rows
 * @returns table definition object
 */
function createProcessNotesTable(tableData = []) {
  const transformer = (column, index) => {
    if (index < 2) return createTableBodyText(column, "center");
    return createTableBodyText(column);
  };
  const tableDataComponents = tableHelper.transformTableRowText(
    tableData,
    transformer
  );
  const table = {
    widths: ["auto", "auto", "*"],
    body: [
      [
        tableHelper.createTableHeaderText("Work", { alignment: "center" }),
        tableHelper.createTableHeaderText("Data & Time", {
          alignment: "center",
        }),
        tableHelper.createTableHeaderText("Comment"),
      ],
      ...tableDataComponents,
    ],
  };
  return tableHelper.baseDataTable(table);
}

const table = {
  createCageTable,
  createThrowTable,
  createProcessNotesTable,
  createCageCommentTable,
  createCommentBlock,
};

export { table, blocks, chapters, headers, utils };
