import { Stack, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/pro-solid-svg-icons";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";

export const PlusMinusNumber = ({
  state,
  incState,
  decState,
}: {
  state: number;
  incState(): void;
  decState(): void;
}) => {
  return (
    <Stack
      direction={"row"}
      spacing={0}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        backgroundColor: "whiteHaze.main",
        maxWidth: "350px",
        width: "350px",
        height: "50px",
        borderRadius: "4px",
        overflow: "hidden",
        p: 0,
      }}
    >
      <Button onClick={decState} variant={"plusMinus" as any}>
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <Typography>{state}</Typography>
      <Button onClick={incState} variant={"plusMinus" as any}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Stack>
  );
};
