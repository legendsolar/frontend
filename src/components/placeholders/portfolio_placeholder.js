const {Typography} = require('@mui/material');
const {
    default: DefaultComponent,
} = require('components/utils/default_component');

const PortfolioPlaceholder = () => {
    return (
        <div>
            <DefaultComponent>
                <Typography variant="smallHeadline">
                    You have not purchased any panels yet
                </Typography>
                <Typography variant="headline1">
                    Click to view available panels
                </Typography>
            </DefaultComponent>
        </div>
    );
};

export default PortfolioPlaceholder;
