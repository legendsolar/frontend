import { Stack, Typography, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { PanelArray } from "./panels";

export interface PanelDisplayProps {
  panelWidth: number;
  panelRows: number;
  currentPanelSelectedCount: number;
  hidePanels: boolean;
  onPanelCountUpdate(newPanelCount: number): void;
}

export const PanelDisplay = ({
  panelWidth,
  panelRows,
  currentPanelSelectedCount,
  hidePanels,
  onPanelCountUpdate,
}: PanelDisplayProps) => {
  const [selectedArray, setSelectedArray] = useState(
    Array.from(Array(panelRows), () => new Array(panelWidth))
  );

  const setSelected = (x, y, selected, propigate = true) => {
    const newArray = [...selectedArray];
    newArray[x][y] = selected;

    const count = newArray.flat().filter((s) => !!s).length;

    console.log("set : " + count);

    setSelectedArray(newArray);

    if (propigate) {
      onPanelCountUpdate(count);
    }
  };

  const selectNext = (select) => {
    const flat = [].concat(...selectedArray);
    const idx = flat.findIndex((x) => (select ? !x : !!x));
    const x = Math.floor(idx / panelWidth);
    const y = idx % panelWidth;

    console.log({ idx, x, y });
    if (x >= 0 && y >= 0) {
      setSelected(x, y, select, false);
    }
  };

  useEffect(() => {
    const selected = selectedArray.flat().filter((s) => !!s).length;
    const diff = currentPanelSelectedCount - selected;

    console.log({ diff });

    if (diff > 0) {
      Array.from({ length: diff }).map(() => selectNext(true));
    } else if (diff < 0) {
      Array.from({ length: -diff }).map(() => selectNext(false));
    }
  }, [currentPanelSelectedCount]);

  //   useEffect(() => {
  //     setSelectedArray(Array.from(Array(panelRows), () => new Array(panelWidth)));
  //   }, [panelRows, panelWidth]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "230px",
        overflowX: "hidden",
        overflowY: "visible",
        marginLeft: "0px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: hidePanels ? "-40px" : "28px",
          top: "20px",
        }}
      >
        <PanelArray
          selectedArray={selectedArray}
          setSelected={setSelected}
          renderHiddenPanels={hidePanels}
        />
      </div>
    </div>
  );
};
