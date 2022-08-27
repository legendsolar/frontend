import {Box, Typography, Button, Stack} from '@mui/material';
import WomanPanelsSVG from 'assets/images/women_panel.svg';
import useEmptyContent from 'hooks/use_empty_content';

export interface EmptyContentProps {
    onViewAvailablePanels(): void;
}

const EmptyContent = ({onViewAvailablePanels}: EmptyContentProps) => {
    return (
        <Box>
            <Stack alignItems={'center'} sx={{mt: '150px'}}>
                <Stack
                    alignItems={'flex-start'}
                    sx={{mb: '100px', maxWidth: '800px'}}
                >
                    <Typography variant={'headline2' as any}>
                        You haven’t purchased solar panels yet, so there is
                        nothing to see on your rooftop.
                    </Typography>
                    <Button
                        variant={'primary' as any}
                        onClick={onViewAvailablePanels}
                    >
                        View Available Panels
                    </Button>
                </Stack>
                <img src={WomanPanelsSVG} width="375px"></img>
            </Stack>
        </Box>
    );
};

export default () => <EmptyContent {...useEmptyContent()}></EmptyContent>;