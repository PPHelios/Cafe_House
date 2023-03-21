import { Global } from "@mantine/core";
import damion from "../assets/fonts/Damion.woff2";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Damion",
            src: `url('${damion}') format("woff2")`,
            fontWeight: "normal",
            fontStyle: "normal",
          },
        },
      ]}
    />
  );
}
