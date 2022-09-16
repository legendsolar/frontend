import {Typography, Accordion, AccordionSummary, Stack} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from 'components/basics/divider';
import Component from 'components/basics/component';

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
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                        height: '105px',
                    }}
                >
                    <Stack direction="row" spacing={4} sx={{height: '100%'}}>
                        {icon}
                        <Typography variant={'subtitle2' as any}>
                            {title}
                        </Typography>
                    </Stack>
                </AccordionSummary>

                <Component
                    standardWidth={false}
                    background
                    sx={{
                        backgroundColor: 'whiteFog.main',
                    }}
                >
                    {content}
                </Component>
            </Accordion>
            {idx !== items.length - 1 && <Divider></Divider>}
        </div>
    ));

    return <div>{accordian}</div>;
};

export default IconAccordian;
