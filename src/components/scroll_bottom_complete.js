import { useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

const ScrollBottomToComplete = ({ onComplete, children }) => {
    const [completeScroll, setCompleteScroll] = useState(false);

    const onScroll = (event) => {
        const target = event.target;

        console.log(
            target.scrollHeight - target.scrollTop,
            target.clientHeight
        );
        if (target.scrollHeight - target.scrollTop <= target.clientHeight + 2) {
            setCompleteScroll(true);
        }
    };

    const onSubmit = (event) => {
        onComplete();
    };

    return (
        <Stack>
            <Box
                onScroll={onScroll}
                sx={{
                    backgroundColor: "whiteHaze.main",
                    borderRadius: "5px",
                    overflow: "auto",
                    height: "900px",
                    p: 2,
                }}
            >
                {children}
            </Box>
            <Button
                variant="primary"
                disabled={!completeScroll}
                onClick={onSubmit}
            >
                Agree
            </Button>

            <Typography variant="smallLabel">
                Scroll to bottom & review to continue
            </Typography>
        </Stack>
    );
};

export default ScrollBottomToComplete;
