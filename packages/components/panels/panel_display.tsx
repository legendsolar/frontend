import { Stack, Typography, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { PanelArray } from "./panels";

export interface PanelDisplayProps {
  currentPanelSelectedCount: number;
}

export const PanelDisplay = ({
  currentPanelSelectedCount,
}: PanelDisplayProps) => {
  const panelWidth = 10;
  const panelRows = 3;

  const [selectedArray, setSelectedArray] = useState(
    Array.from(Array(panelRows), () => new Array(panelWidth))
  );

  const setSelected = (x, y, selected) => {
    const newArray = [...selectedArray];
    newArray[x][y] = selected;
    setSelectedArray(newArray);
  };

  const selectNext = (select) => {
    const flat = [].concat(...selectedArray);
    const idx = flat.findLastIndex((x) => !!x);
    const x = Math.floor(idx / panelWidth);
    const y = idx % panelWidth;
    console.log({ x, y });
    if (x >= 0 && y >= 0) {
      if (x < selectedArray[0].length - 1) {
        setSelected(x + 1, y, select);
        return;
      }
      if (y < selectedArray.length - 1) {
        setSelected(0, y + 1, select);
        return;
      }
    } else {
      return setSelected(0, 0, select);
    }
  };

  const selected = selectedArray.flat().filter((s) => !!s).length;

  useEffect(() => {
    const diff = currentPanelSelectedCount - selected;

    console.log(diff);

    // if (diff > 0) {
    //   Array.from({ length: diff }).map(() => selectNext(true));
    // } else if (diff < 0) {
    //   Array.from({ length: -diff }).map(() => selectNext(false));
    // }
  }, [currentPanelSelectedCount]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "230px",
        overflowX: "hidden",
        overflowY: "visible",
        marginLeft: "-20px",
      }}
    >
      <div style={{ position: "absolute", left: "-0px", top: "20px" }}>
        <PanelArray
          width={panelWidth}
          height={panelRows}
          selectedArray={selectedArray}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};
