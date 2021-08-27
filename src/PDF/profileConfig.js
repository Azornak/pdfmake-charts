import { optimarColorPalette } from "./assets/colors";

const profileConfig = {
  // sizes
  CHAPTER_LINE_HEIGHT: 5,
  SUB_CHAPTER_LINE_HEIGHT: 3,
  DATA_POINT_LINE_HEIGHT: 0.5,
  DOCUMENT_WIDTH: 555, // FOR A4
  // colors
  HEAD_FOOT_COLOR: optimarColorPalette.primaryLogo,
  SEPERATOR_LINE_COLOR: optimarColorPalette.secondaryBright,
  CHECKBOX_BACKGROUND_COLOR: optimarColorPalette.primaryDark,
  CHECKBOX_CHECK_COLOR: optimarColorPalette.primaryLight,
  DATA_TABLE_HEADER_COLOR: "#7F7F7F",
  DATA_TABLE_HEADER_TEXT_COLOR: "#FFFFFF",
  DATA_TABLE_ROW_COLOR: "#F2F2F2",
  DATA_TABLE_BORDER_COLOR: "#FFF",

  COLOR_TABLE_HEADER_COLOR: optimarColorPalette.primaryLogo,
  COLOR_TABLE_HEADER_TEXT_COLOR: "#FFFFFF",
  COLOR_TABLE_N1_ROW_COLOR: "#E9EBF5",
  COLOR_TABLE_N2_ROW_COLOR: "#CFD5EA",
  COLOR_TABLE_BORDER_COLOR: "#FFF",

  // margins
  TITLE_MARGINS: [1, 15, 0, 3],
  DATA_POINT_TEXT_MARGINS: [1, 3, 0, 3],
  TABLE_MARGINS: [0, 15, 0, 0],
  TABLE_TEXT_MARGINS: [0, 5, 2, 5],
};

export const pdfConfig = {
  pageSize: "A4",
  pageMargins: [20, 70, 20, 60],
  styles: {
    header: {
      bold: true,
      margin: profileConfig.TITLE_MARGINS,
    },
    subHeader: {
      bold: false,
      margin: profileConfig.TITLE_MARGINS,
    },
    dataPointHeader: {
      bold: false,
      margin: profileConfig.TITLE_MARGINS,
    },
    dataPointText: {
      bold: false,
      margin: profileConfig.DATA_POINT_TEXT_MARGINS,
    },
    tableHeader: {
      bold: true,
      color: profileConfig.DATA_TABLE_HEADER_TEXT_COLOR,
      border: [true, true, true, true],
      margin: profileConfig.TABLE_TEXT_MARGINS,
    },
    tableRow: {
      border: [true, true, true, true],
      margin: profileConfig.TABLE_TEXT_MARGINS,
    },
  },
};

export default profileConfig;
