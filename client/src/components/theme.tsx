import "@emotion/react";
import createGlobalStyle from "@emotion/styled";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      primary: "#0000FF";
      secondary: "#002DB3";
      light: "#BFCFFF";
    };
  }
}
