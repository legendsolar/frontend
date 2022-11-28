import {Button, Stack, Typography} from '@mui/material';
import {AccreditationOption} from 'content/verify_accreditation_content';
import {ComponentDivider} from '../basics/component_divider';

export const AccreditationStatus = ({
    options,
}: {
    options: Array<AccreditationOption>;
}) => {
    return (
        <Stack>
            {options.map((option, idx) => (
                <div key={idx}>
                    <Typography variant="subtitle1">{option.title}</Typography>
                    <Typography variant={'description' as any}>
                        {option.description}
                    </Typography>

                    {idx !== options.length - 1 && (
                        <ComponentDivider sx={{mt: 2}}></ComponentDivider>
                    )}
                </div>
            ))}
        </Stack>
    );
};
