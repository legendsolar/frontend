import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ReturnsCalculator, ReturnsCalculatorProps} from '@project/components';
import {UnitEnum} from '@project/hooks/types';
import {useState} from 'react';
import AirtableDecorator from '../.storybook/decorators/AirtableDecorator';

import {useReturnCalculator} from '@project/hooks/airtable';
import {clamp} from '@p/utils';

const meta: Meta = {
    title: 'Returns Calculator',
    component: ReturnsCalculator,
    argTypes: {
        setPanels: {action: 'setPanels'},
    },
    parameters: {
        controls: {expanded: true},
    },
    decorators: [AirtableDecorator],
};

export default meta;

const Template: Story<ReturnsCalculatorProps> = (args) => {
    const [panels, setPanelsInternal] = useState(1);

    return (
        <ReturnsCalculator
            {...{panels, ...args, setPanels: setPanelsInternal}}
        ></ReturnsCalculator>
    );
};

const AirtableTemplate: Story<ReturnsCalculatorProps> = ({
    minPanels,
    maxPanels,
    panelCost,
    maxYears,
}) => {
    const {loading, records} = useReturnCalculator();

    const [panels, setPanelsInternal] = useState(1);

    const setPanels = (p: number) =>
        setPanelsInternal(clamp(minPanels, maxPanels, p));

    if (loading) {
        return <div>{`dev only: component loading`}</div>;
    }

    return (
        <ReturnsCalculator
            maxPanels={maxPanels}
            maxYears={maxYears}
            minPanels={minPanels}
            panelCost={panelCost}
            panelRecords={records}
            panels={panels}
            setPanels={setPanels}
        ></ReturnsCalculator>
    );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Test = Template.bind({});
Test.args = {
    minPanels: 1,
    maxPanels: 10,
    panelCost: 250,
    panelRecords: Array.from({length: 10}).map((_, i) => ({
        panelCount: i,
        analogies: {
            [UnitEnum.DOLLARS]: i + 'th index dollar string',
            [UnitEnum.CARBON]: i + 'th index carbon string',
            [UnitEnum.ENERGY]: i + 'th index energy',
        },
        totals: {
            [UnitEnum.DOLLARS]: i * 1000,
            [UnitEnum.CARBON]: i * 100,
            [UnitEnum.ENERGY]: i * 10000,
        },
        imageUrl: {
            [UnitEnum.DOLLARS]:
                'https://v5.airtableusercontent.com/v1/9/9/1666828800000/wWTs73C__B1l6rfA4eHgXw/A78VJIFYY_DGCKEoZxD23npVYs_VuQLXgmOreiequpVvKdoKePlLP0gS-cv9r8dZ-JJ2SnGINyqmptyDhDmLWw/MqSfH_N2T2B2wVdq9RUAoHwzkVkS6bBRnLQ_-Tk6udU',
            [UnitEnum.CARBON]:
                'https://v5.airtableusercontent.com/v1/9/9/1666828800000/wWTs73C__B1l6rfA4eHgXw/A78VJIFYY_DGCKEoZxD23npVYs_VuQLXgmOreiequpVvKdoKePlLP0gS-cv9r8dZ-JJ2SnGINyqmptyDhDmLWw/MqSfH_N2T2B2wVdq9RUAoHwzkVkS6bBRnLQ_-Tk6udU',
            [UnitEnum.ENERGY]:
                'https://v5.airtableusercontent.com/v1/9/9/1666828800000/wWTs73C__B1l6rfA4eHgXw/A78VJIFYY_DGCKEoZxD23npVYs_VuQLXgmOreiequpVvKdoKePlLP0gS-cv9r8dZ-JJ2SnGINyqmptyDhDmLWw/MqSfH_N2T2B2wVdq9RUAoHwzkVkS6bBRnLQ_-Tk6udU',
        },
    })),
};

export const Airtable = AirtableTemplate.bind({});
Airtable.args = {
    minPanels: 1,
    maxPanels: 10,
    panelCost: 250,
    maxYears: 10,
};
