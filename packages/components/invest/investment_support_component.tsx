import { Typography, Stack, Box, Button } from "@mui/material";
import { Component } from "../basics/component";
import NeraPNG from "../../assets/people/headshots/nera.png";
import { EXTERNAL_LINKS } from "@p/utils/webflow/webflowLinking";
import { Image } from "../utils/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faEnvelope } from "@fortawesome/pro-solid-svg-icons";
interface InvestmentSupportComponentProps {
  title: string;
  subtitle: string;
  description: string;
  sx: any;
}

export const InvestmentSupportComponent = ({
  title,
  subtitle,
  description,
  sx,
}: InvestmentSupportComponentProps) => {
  return (
    <Component
      shadow
      sx={{
        ...sx,
        p: 0,
        width: {
          md: "100%",
          lg: "450px",
        },
        maxWidth: {
          lg: "450px",
        },
      }}
    >
      <Stack sx={{ m: 4 }}>
        <Stack direction="row" justifyContent={"space-between"}>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Image
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "5px",
              }}
              src={NeraPNG}
            ></Image>
            <Stack spacing={0}>
              <Typography variant={"smallHeadline" as any}>{title}</Typography>
              <Typography
                variant={"monoButton" as any}
                color={"legendaryGreen.main"}
              >
                {subtitle}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Typography variant={"body" as any}>{description}</Typography>
      </Stack>
      <Box
        sx={{
          backgroundColor: "whiteHaze.main",
          height: "45px",
          pr: 4,
          pl: 4,
          borderRadius: "0px 0px 5px 5px",
        }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"}>
          <Button
            href={EXTERNAL_LINKS.TEAM.NERA}
            target={"_blank"}
            variant="text"
          >
            <Typography
              variant={"monoButton" as any}
              sx={{ textTransform: "uppercase" }}
              color={"legendaryGreen.main"}
            >
              {"Meet "}
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
            </Typography>
          </Button>

          <Button
            href={EXTERNAL_LINKS.TEAM.NERA}
            target={"_blank"}
            variant="text"
          >
            <Typography
              sx={{ textTransform: "uppercase" }}
              variant={"monoButton" as any}
              color={"legendaryGreen.main"}
            >
              {"Email "}
              <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
            </Typography>
          </Button>
        </Stack>
        <Button
          href={EXTERNAL_LINKS.TEAM.NERA}
          target={"_blank"}
          variant="text"
          sx={{ textTransform: "uppercase" }}
        >
          <Typography variant={"monoButton" as any} color={"blackDawn.main"}>
            Biography
          </Typography>
        </Button>
      </Box>
    </Component>
  );
};
