import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";

import { ReturnsCalculator } from "@project/components/calculator/returns_calculator";
import { appTheme } from "@project/components/theme";
import { ThemeProvider } from "@mui/material";
import { ProvideAirtable, useReturnCalculator } from "@project/hooks/airtable";

const App = () => {
  const args = {
    minPanels: 1,
    maxPanels: 10,
    panelCost: 250,
    maxYears: 10,
  };

  const [panels, setPanelsInternal] = useState(1);

  const { loading, records } = useReturnCalculator();

  React.useEffect(() => {
    const listener = (e) => {
      const newValue = e.detail;
      setPanelsInternal(newValue);
    };

    window.addEventListener(`panelCount`, listener);

    return () => {
      window.removeEventListener("panelCount", listener);
    };
  }, [panels]);

  const setPanels = (newValue) => {
    if (newValue > 0 && newValue < 11) {
      window.dispatchEvent(new CustomEvent(`panelCount`, { detail: newValue }));

      setPanelsInternal(newValue);
    }
  };

  if (loading) {
    return <></>;
  }

  return (
    <ReturnsCalculator
      {...{
        panels,
        ...args,
        setPanels: setPanels,
        panelRecords: records,
      }}
    ></ReturnsCalculator>
  );
};

ReactDOM.render(
  <ThemeProvider theme={appTheme}>
    <ProvideAirtable>
      <App />
    </ProvideAirtable>
  </ThemeProvider>,
  document.getElementById("root")
);
