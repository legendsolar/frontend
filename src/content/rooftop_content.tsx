import {Typography} from '@mui/material';
import DefaultComponent from 'components/utils/default_component';

interface RooftopContentProps {
    widgets: JSX.Element;
}

const RooftopContent = ({widgets}: RooftopContentProps) => {
    return (
        <DefaultComponent
            paper
            standardWidth={false}
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
        </DefaultComponent>
    );
};

export default RooftopContent;
