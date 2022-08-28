import {TextField as MuiTextField} from '@mui/material';

const TextField = ({
    color,
    error,
    helperText,
    value,
    onChange,
    onBlur,
    name,
    label,
    id,
    autoComplete,
    disabled,

    alwaysDisplayHelper = false,
}) => {
    return (
        <MuiTextField
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
            autoComplete={autoComplete}
        ></MuiTextField>
    );
};

export default TextField;
