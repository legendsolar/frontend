import { Stack, Button, Box, Chip, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import CheckboxList from "./inputs/checkbox_list";

const AccreditationStatus = ({ onContinue }) => {
    const [continueEnabled, setContinueEnabled] = useState(false);
    return (
        <div>
            <Stack
                sx={{
                    backgroundColor: "whiteHaze.main",
                    mt: -2,
                    p: 2,
                    ml: -2,
                    mr: -2,
                }}
                spacing={2}
                justifyContent="space-between"
            >
                <Typography variant="smallHeadline">
                    Accreditation Status
                </Typography>

                <Typography variant="description">
                    Legends Solar offers private placements regulated by the SEC
                    under Regulation D. All investors must be accredited in
                    order to participate in Legends Solar offerings.
                </Typography>

                <Stack
                    direction={"row"}
                    justifyContent="space-between"
                    alignItems={"end"}
                >
                    <Typography variant="body2">
                        Check all that apply
                    </Typography>
                    <Chip
                        label="Learn About Investor Accreditation"
                        variant="light"
                        onClick={() => {}}
                    ></Chip>
                </Stack>
            </Stack>

            <Stack>
                <CheckboxList
                    options={[
                        {
                            title: "Income",
                            description:
                                "I earn $200,000 yearly, or $300,000 with my spousal equivalant",
                        },
                        {
                            title: "Personal Net Worth",
                            description:
                                "I have $1,000,000 in assets, excluding my primary residence",
                        },
                        {
                            title: "License Holder",
                            description:
                                "I hold a Series 7, 65, or 82 license currently in good standing",
                        },
                        {
                            title: "Entity Owner",
                            description:
                                "I own an entity (e.g. family office) with $5,000,000+ in assets",
                        },
                        {
                            title: "None of the above",
                            description: "I am not an accredited investor",
                            exclusive: true,
                        },
                    ]}
                    onInputChange={(checkedList) => {
                        if (checkedList.some((el) => el)) {
                            setContinueEnabled(true);
                        } else {
                            setContinueEnabled(false);
                        }
                    }}
                ></CheckboxList>

                <Button
                    variant="primary"
                    disabled={!continueEnabled}
                    onClick={() => onContinue()}
                >
                    Continue
                </Button>
                <Typography align={"center"} variant="smallLabel">
                    OR
                </Typography>
                <Button variant="secondary" onClick={() => onContinue()}>
                    Skip for now
                </Button>
            </Stack>
        </div>
    );
};

export default AccreditationStatus;
