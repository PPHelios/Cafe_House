import { appState } from "../store/appState";
export const mantineTheme = {
  colorScheme: appState.themeColor.color.value,
  dir: docDir === "rtl" ? "rtl" : "ltr",
  colors: {
    // Add your color
    gold: ["#c79c60" /* ... */],
    // or replace default theme color
    //  blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
  },

  // shadows: {
  //   md: '1px 1px 3px rgba(0, 0, 0, .25)',
  //   xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  // },

  // headings: {
  //   fontFamily: 'Roboto, sans-serif',
  //   sizes: {
  //     h1: { fontSize: '2rem' },
  //   },
  // },
};
