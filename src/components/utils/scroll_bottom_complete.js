import {useState} from 'react';
import {Box, Button, Typography, Stack} from '@mui/material';

const ScrollBottomToComplete = ({onComplete, children, completed}) => {
    const [completeScroll, setCompleteScroll] = useState(false);

    const onScroll = (event) => {
        const target = event.target;
        if (target.scrollHeight - target.scrollTop <= target.clientHeight + 2) {
            setCompleteScroll(true);
        }
    };

    const onSubmit = (event) => {
        onComplete(event);
    };

    return (
        <Stack>
            <Box
                onScroll={onScroll}
                sx={{
                    backgroundColor: 'whiteHaze.main',
                    borderRadius: '5px',
                    overflow: 'auto',
                    height: '90vh',
                    minHeight: '800px',
                    p: 2,
                }}
            >
                {children}
            </Box>
            <Button
                variant="primary"
                disabled={!completeScroll || completed}
                onClick={onSubmit}
            >
                {completed ? 'Accepted' : 'Agree'}
            </Button>

            <Typography variant="smallLabel">
                Scroll to bottom & review to continue
            </Typography>
        </Stack>
    );
};

export default ScrollBottomToComplete;
