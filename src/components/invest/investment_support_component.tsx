import {Typography} from '@mui/material';
import Component from 'components/basics/component';

interface InvestmentSupportComponentProps {
    title: string;
    description: string;
}

const InvestmentSupportComponent = ({
    title,
    description,
}: InvestmentSupportComponentProps) => {
    return (
        <Component standardWidth={false} shadow>
            <Typography>{title}</Typography>
            <Typography>{description}</Typography>
        </Component>
    );
};

export default InvestmentSupportComponent;
