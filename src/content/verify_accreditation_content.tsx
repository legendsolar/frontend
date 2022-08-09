import DefaultComponent from 'components/utils/default_component';
import {useState} from 'react';
import CheckboxList, {CheckboxItem} from 'components/inputs/checkbox_list';
import {Button, Stack, Typography} from '@mui/material';
import {
    AcceptanceStatus,
    AccountResolvers,
    AccreditationOptions,
} from 'schema/schema_gen_types';

interface AccreditationOption extends CheckboxItem {
    accredited: boolean;
}

const ACCREDITATION_OPTIONS: Array<AccreditationOption> = [
    {
        title: 'Income',
        description:
            'I earn $200,000 yearly, or $300,000 with my spousal equivalant',
        accredited: true,
        key: AccreditationOptions.Income as string,
    },
    {
        title: 'Personal Net Worth',
        description:
            'I have $1,000,000 in assets, excluding my primary residence',
        accredited: true,
        key: AccreditationOptions.NetWorth as string,
    },
    {
        title: 'License Holder',
        description:
            'I hold a Series 7, 65, or 82 license currently in good standing',
        accredited: true,
        key: AccreditationOptions.LicenseHolder as string,
    },
    {
        title: 'Entity Owner',
        description:
            'I own an entity (e.g. family office) with $5,000,000+ in assets',
        accredited: true,
        key: AccreditationOptions.EntityOwner as string,
    },
    {
        title: 'None of the above',
        description: 'I am not an accredited investor',
        accredited: true,
        exclusive: true,
        key: AccreditationOptions.None as string,
    },
];

interface VerifyAccreditationContentProps {
    onAccreditationStatusSubmit(
        statuses: Array<AccreditationOption>,
    ): Promise<any>;
}

const VerifyAccreditationContent = ({
    onAccreditationStatusSubmit,
}: VerifyAccreditationContentProps) => {
    const [accreditationList, setAccreditationList] = useState<
        Array<AccreditationOption>
    >([]);

    const onContinue = () => {
        onAccreditationStatusSubmit(accreditationList);
    };

    return (
        <DefaultComponent>
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

            <CheckboxList
                items={ACCREDITATION_OPTIONS}
                onInputChange={(items) => {
                    const newList = items
                        .filter((item) => item.checked)
                        .map(
                            (item) =>
                                item.key as unknown as AccreditationOption,
                        );
                    setAccreditationList(newList);
                }}
                disabled={false}
            ></CheckboxList>

            <Button variant={'primary' as any} onClick={onContinue}>
                Continue
            </Button>
        </DefaultComponent>
    );
};

export default VerifyAccreditationContent;
