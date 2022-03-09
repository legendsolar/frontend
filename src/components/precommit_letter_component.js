import { useState } from "react";

import {
    Button,
    TextField,
    InputAdornment,
    Typography,
    Stack,
} from "@mui/material";
import DefaultComponent from "./default_component";

const PrecommitLetterComponent = ({ onComplete }) => {
    const [signature, setSignature] = useState(null);

    return (
        <DefaultComponent>
            <Stack spacing={4}>
                <Typography variant="smallHeadline">
                    Precommit Letter
                </Typography>
                <Stack>
                    <Typography variant="headline2">
                        Extra Space Mini Storage Solar
                    </Typography>
                    <Typography variant="subtitle2">
                        Precommit Letter
                    </Typography>
                </Stack>

                <Typography variant="body">
                    This pre-commitment letter indicates my intent to make the
                    above listed investment in a Legends Solar facility.
                </Typography>

                <Typography variant="body">
                    I have carefully reviewed the pro forma and supplemental
                    documents. I am confident that I understand the risks
                    involved in this investment. In particular, I understand the
                    tax benefits attached to this investment. I plan on taking
                    necessary steps to monetize these benefits in my personal
                    filings.
                </Typography>
                <Typography variant="body">
                    Once Legends Solar and its affiliates are prepared to
                    initiate the investment, I will complete a wire transfer to
                    the special purpose vehicle indicated in this offering’s
                    supplemental documents.
                </Typography>

                <Typography variant="body">Sincerely,</Typography>

                <TextField
                    hiddenLabel={true}
                    name="signature"
                    variant="filled"
                    // label={signature ? null : "Sign here"}
                    inputProps={{
                        style: {
                            fontSize: "24px",
                            fontWeight: "400",
                            fontFamily: "Permanent Marker",
                        },
                    }}
                    value={signature}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Typography
                                    sx={{
                                        fontSize: "24px",
                                        fontWeight: "400",
                                        fontFamily: "Permanent Marker",
                                    }}
                                >
                                    x
                                </Typography>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setSignature(value);
                    }}
                ></TextField>

                <Button
                    variant="primary"
                    disabled={!signature}
                    onClick={onComplete}
                >
                    {!signature
                        ? "Digitally sign letter to continue"
                        : "Click to confirm signature"}
                </Button>
            </Stack>
        </DefaultComponent>
    );
};

export default PrecommitLetterComponent;
