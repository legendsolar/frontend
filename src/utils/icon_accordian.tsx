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
        <div>
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
            {idx !== items.length - 1 && <Divider></Divider>}
        </div>
    ));

    return <div>{accordian}</div>;
};

export default IconAccordian;
