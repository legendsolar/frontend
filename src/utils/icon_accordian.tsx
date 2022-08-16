import {Typography, Accordion, AccordionSummary, Stack} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from 'components/basics/divider';

interface Item {
    title: string;
    content: JSX.Element;
    icon: JSX.Element;
}

const IconAccordian = ({items}: {items: Array<Item>}) => {
    const accordian = items.map(({title, content, icon}, idx) => (
        <Accordion
            key={idx}
            variant={'none' as any}
            sx={{
                '&:before': {
                    display: 'none',
                },
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" spacing={4}>
                    {icon}
                    <Typography>{title}</Typography>
                </Stack>
            </AccordionSummary>

            {content}
        </Accordion>
    ));

    return <div>{accordian}</div>;
};

export default IconAccordian;
