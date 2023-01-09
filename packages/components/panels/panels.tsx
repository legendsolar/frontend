import { Box } from "@mui/material";
import { useState } from "react";
import { Stack } from "@mui/material";
import "../styles.css";

export const PanelArray = ({
  selectedArray,
  setSelected,
  renderHiddenPanels = false,
}: {
  selectedArray: Array<Array<boolean>>;
  setSelected(x: number, y: number, selected: boolean): void;
  renderHiddenPanels: boolean;
}) => {
  const [startTime, setStartTime] = useState(undefined);

  const onAnimationStart = (startTime) => {
    setStartTime(startTime);
  };

  return (
    <div
      style={{
        transform: "matrix(0.94, 0, 0.38, 1, 0, 0)",
      }}
    >
      <Stack spacing={0}>
        {Array.from({ length: selectedArray.length }).map((_, x: number) => (
          <Stack direction={"row"} spacing={0}>
            {renderHiddenPanels && (
              <Panel
                key={`hidden_0_${x}`}
                onAnimationStart={() => {}}
                animationSyncTime={0}
                setSelected={() => {}}
                selected={false}
                selectable={false}
              ></Panel>
            )}

            {renderHiddenPanels && (
              <Panel
                key={`hidden_1_${x}`}
                onAnimationStart={() => {}}
                animationSyncTime={0}
                setSelected={() => {}}
                selected={false}
                selectable={false}
              ></Panel>
            )}

            {Array.from({ length: selectedArray[0]?.length }).map(
              (_, y: number) => (
                <Panel
                  key={`${y}_${x}`}
                  onAnimationStart={onAnimationStart}
                  animationSyncTime={startTime}
                  setSelected={(selected) => setSelected(x, y, selected)}
                  selected={selectedArray[x][y]}
                  selectable={true}
                ></Panel>
              )
            )}
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

const Panel = ({
  animationSyncTime,
  onAnimationStart,
  selected,
  setSelected,
  selectable,
}) => {
  const [mouseOver, setMouseOver] = useState(false);

  const hover = (mouseOver || selected) && selectable;

  return (
    <Box
      style={{}}
      sx={{
        width: "34.19px",
        height: "52.21px",
        position: "relative",
        animationName: hover ? "panelAnimation" : "none",
        animationDuration: "2s",
        animationIterationCount: hover ? "infinite" : "0",
        animationTimingFunction: hover ? "ease-in-out" : "0",
        // transform: selected
        //   ? "matrix(1.0638, 0, -0.404255, 1, 0, 0) matrix(0.94, 0, 0.38, 1, 0, -10)"
        //   : "none",
        zIndex: hover ? 100 : 99,
        filter: hover
          ? "drop-shadow(0px 0px 25px rgba(99, 110, 114, 0.25))"
          : "none",
      }}
      onClick={() => {
        setSelected(!selected);
      }}
      onMouseOver={() => {
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setMouseOver(false);
      }}
      onAnimationStart={(evt) => {
        const anims = evt.target?.getAnimations();
        if (anims && anims.length == 1 && !animationSyncTime) {
          const startTime = anims[0].startTime;
          onAnimationStart(startTime);
        } else if (anims && anims.length == 1 && animationSyncTime) {
          const anim = anims[0];
          anim.startTime = animationSyncTime;
        }
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "0%",
          right: "0%",
          top: "0%",
          bottom: "0%",
          background: selected ? "#345D34" : "#477FB2",
          border: "3px solid #FFFFFF",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            background: "#000000",
            opacity: "0.5",
            position: "absolute",
            left: "-10%",
            right: "-10%",
            top: "55.17%",
            bottom: "-10%",
            transform: "rotate(-10deg)",
          }}
        ></Box>
      </Box>
    </Box>
  );
};
