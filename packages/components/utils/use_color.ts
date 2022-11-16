import {useTheme} from '@mui/material';
import {themeOptions} from '../theme/theme';

export const useThemeColor = (color: string) => {
    const theme = useTheme();
    if (color in theme.palette) {
        return theme.palette[color].main;
    }

    return color;
};
