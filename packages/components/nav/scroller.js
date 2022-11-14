import {useState} from 'react';
import {Box, Button, Typography, Stack} from '@mui/material';

const Scroller = ({onComplete, children, sx}) => {
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
        <Box
            onScroll={onScroll}
            sx={{
                backgroundColor: 'white.main',
                borderRadius: '5px',
                overflow: 'auto',
                p: 3,
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default Scroller;
