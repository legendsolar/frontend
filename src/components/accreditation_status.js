import { Stack, Button, Box, Typography } from "@mui/material";
import CheckboxList from "./inputs/checkbox_list";

const AccreditationStatus = () => {
    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">
                Accreditation Status
            </Typography>

            <Typography variant="subtitle1">Check all that apply</Typography>
            <CheckboxList
                options={[
                    {
                        title: "Income",
                        description:
                            "I earn $200,000+ yearly, or $300,000 with my spousal equivalent",
                    },

                    {
                        title: "Income",
                        description:
                            "I earn $200,000+ yearly, or $300,000 with my spousal equivalent",
                    },

                    {
                        title: "Income",
                        description:
                            "I earn $200,000+ yearly, or $300,000 with my spousal equivalent",
                    },
                ]}
            ></CheckboxList>
            <Box sx={{ height: "500px" }}> Verify Investor Embed</Box>
            <Button variant="primary">Continue</Button>
            <Typography align={"center"} variant="smallLabel">
                OR
            </Typography>
            <Button variant="secondary">Skip for now</Button>
        </Stack>
    );
};

export default AccreditationStatus;
