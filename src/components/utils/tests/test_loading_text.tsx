import {Button, Stack, Typography} from '@mui/material';
import LoadingText from '../loading_text';

export default () => (
    <Stack>
        <Button>
            <LoadingText></LoadingText>
        </Button>
        <Typography variant={'smallHeadline' as any}>
            <LoadingText></LoadingText>
        </Typography>
    </Stack>
);
