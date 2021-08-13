import { seperatorLineSVG } from "../assets/svgs";
import { checkBoxCheckedSVG, checkBoxSVG } from "./checkbox";
import createProcessNotesTable from "./tables/processNotesTable";
import createCageCommentTable from "./tables/cageCommentTable";
import createCageTable from "./tables/cageTable";
import createThrowTable from "./tables/throwTable";
import createGraphHelperTable from "./tables/graphHelperTable";
import createCommentBlock from "./tables/commentBlock";

const DOCUMENT_WIDTH = 555;
const CHAPTER_LINE_HEIGHT = 5;
const SUB_CHAPTER_LINE_HEIGHT = 3;
const DATA_POINT_LINE_HEIGHT = 0.5;
const SEPERATOR_LINE_COLOR = "#55D2E9";
//
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
    style: "dataPointText",
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

const table = {
  createCageTable,
  createThrowTable,
  createProcessNotesTable,
  createCageCommentTable,
  createCommentBlock,
};

export { table, blocks, chapters, headers, utils };
