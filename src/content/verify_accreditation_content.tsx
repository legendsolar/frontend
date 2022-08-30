import Component from 'components/basics/component';
import {useState} from 'react';
import CheckboxList, {CheckboxListItem} from 'components/inputs/checkbox_list';
import {Button, Typography, CircularProgress} from '@mui/material';
import {AccreditationOptions} from 'schema/schema_gen_types';
import LoadingText from 'components/utils/loading_text';

export interface AccreditationOption extends CheckboxListItem {
    accredited: boolean;
    accreditationOption: AccreditationOptions;
}

export const ACCREDITATION_OPTIONS: Array<AccreditationOption> = [
    {
        title: 'Income',
        description:
            'I earn $200,000 yearly, or $300,000 with my spousal equivalant',
        accredited: true,
        key: AccreditationOptions.Income as string,
        accreditationOption: AccreditationOptions.Income,
    },
    {
        title: 'Personal Net Worth',
        description:
            'I have $1,000,000 in assets, excluding my primary residence',
        accredited: true,
        key: AccreditationOptions.NetWorth as string,
        accreditationOption: AccreditationOptions.NetWorth,
    },
    {
        title: 'License Holder',
        description:
            'I hold a Series 7, 65, or 82 license currently in good standing',
        accredited: true,
        key: AccreditationOptions.LicenseHolder as string,
        accreditationOption: AccreditationOptions.LicenseHolder,
    },
    {
        title: 'Entity Owner',
        description:
            'I own an entity (e.g. family office) with $5,000,000+ in assets',
        accredited: true,
        key: AccreditationOptions.EntityOwner as string,
        accreditationOption: AccreditationOptions.EntityOwner,
    },
    {
        title: 'None of the above',
        description: 'I am not an accredited investor',
        accredited: true,
        exclusive: true,
        key: AccreditationOptions.None as string,
        accreditationOption: AccreditationOptions.None,
    },
];

interface VerifyAccreditationContentProps {
    onAccreditationStatusSubmit(statuses: Array<AccreditationOptions>): void;
    loading: boolean;
}

const VerifyAccreditationContent = ({
    onAccreditationStatusSubmit,
    loading,
}: VerifyAccreditationContentProps) => {
    const [accreditationList, setAccreditationList] = useState<
        Array<AccreditationOption>
    >([]);

    const onContinue = () => {
        onAccreditationStatusSubmit(
            accreditationList.map(
                (accreditation) => accreditation.accreditationOption,
            ),
        );
    };

    return (
        <Component sx={{background: 'none'}}>
            <Typography variant={'smallHeadline' as any}>
                Accreditation
            </Typography>
            <Typography variant={'body1'}>
                All investors must be accredited in order to participate in
                Legends Solar offerings
            </Typography>

            <Typography variant={'subtitle2' as any}>
                Check all that apply
            </Typography>

            <CheckboxList<AccreditationOption>
                items={ACCREDITATION_OPTIONS}
                onInputChange={(items) => {
                    setAccreditationList(items);
                }}
                disabled={false}
            ></CheckboxList>

            <Button variant={'primary' as any} onClick={onContinue}>
                {loading ? <LoadingText></LoadingText> : 'Continue'}
            </Button>
        </Component>
    );
};

export default VerifyAccreditationContent;
