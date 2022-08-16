import {Typography} from '@mui/material';
import Component from 'components/basics/component';

interface RooftopContentProps {
    widgets: JSX.Element;
}

const RooftopContent = ({widgets}: RooftopContentProps) => {
    return (
        <Component
            sx={{
                backgroundColor: 'whiteFog.main',
            }}
        >
            <Typography
                variant={'headline2' as any}
                color={'legendaryGreen.main' as any}
            >
                Rooftop
            </Typography>
            {widgets}
        </Component>
    );
};

export default RooftopContent;
