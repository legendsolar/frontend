import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  Stack,
} from "@mui/material";
import { faAngleDown } from "@fortawesome/pro-solid-svg-icons";
import { Divider } from "../basics/divider";
import { Component } from "../basics/component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Item {
  title: string;
  content: JSX.Element;
  icon: JSX.Element;
}

export const IconAccordian = ({ items }: { items: Array<Item> }) => {
  const accordian = items.map(({ title, content, icon }, idx) => (
    <div key={idx}>
      <Accordion
        key={idx}
        variant={"none" as any}
        sx={{
          "&:before": {
            display: "none",
          },
        }}
        defaultExpanded={false}
      >
        <AccordionSummary
          expandIcon={<FontAwesomeIcon icon={faAngleDown} />}
          sx={{
            height: "105px",
          }}
        >
          <Stack direction="row" spacing={4} sx={{ height: "100%" }}>
            {icon}
            <Typography variant={"subtitle2" as any}>{title}</Typography>
          </Stack>
        </AccordionSummary>

        <Box>{content}</Box>
      </Accordion>
      {idx !== items.length - 1 && <Divider></Divider>}
    </div>
  ));

  return <div>{accordian}</div>;
};

export default IconAccordian;
