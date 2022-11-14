import {Box, Typography, Button, Stack} from '@mui/material';
import WomanPanelsSVG from 'assets/images/women_panel.svg';
import useEmptyContent from '@project/hooks/use_empty_content';

export interface EmptyContentProps {
    onViewAvailablePanels(): void;
    messageOverride?: String;
}

const EmptyContent = ({
    onViewAvailablePanels,
    messageOverride,
}: EmptyContentProps) => {
    return (
        <Box>
            <Stack alignItems={'center'} sx={{mt: '150px'}}>
                <Stack
                    alignItems={'flex-start'}
                    sx={{mb: '100px', maxWidth: '800px'}}
                >
                    <Typography variant={'headline2' as any}>
                        {messageOverride
                            ? messageOverride
                            : `You haven\’t purchased solar panels yet, so there is
                        nothing to see on your rooftop.`}
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

export default ({messageOverride}: {messageOverride?: string}) => (
    <EmptyContent {...useEmptyContent({messageOverride})}></EmptyContent>
);
