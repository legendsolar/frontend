import {TextField as MuiTextField} from '@mui/material';
import {inputLabelClasses} from '@mui/material/InputLabel';

export const TextField = ({
    color,
    error,
    helperText,
    value,
    onChange,
    onBlur,
    name,
    label,
    id,
    autoComplete = '',
    disabled = false,
    type = 'string',
    alwaysDisplayHelper = false,
    variant = 'filled',
}) => {
    return (
        <MuiTextField
            variant={variant as any}
            disabled={disabled}
            color={color}
            error={error}
            helperText={
                (helperText && error) || alwaysDisplayHelper ? helperText : ' '
            }
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            label={label}
            id={id}
            type={type}
            autoComplete={autoComplete}
            InputLabelProps={{
                sx: !error
                    ? {
                          [`&.${inputLabelClasses.focused}`]: {
                              color: 'blackDusk.main',
                          },
                      }
                    : {},
            }}
        ></MuiTextField>
    );
};
