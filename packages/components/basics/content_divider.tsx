import {Box} from '@mui/material';

interface ContentDividerProps {
    children?: JSX.Element;
    sx?: any;
    color?: string;
}

export const ContentDivider = ({
    sx = {},
    children = <></>,
    color = 'whiteFog',
}: ContentDividerProps) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    mr: 2,
                    flex: 1,
                    height: '2px',
                    backgroundColor: color + '.main',
                    ...sx,
                }}
            ></Box>
            <div>{children}</div>
            <Box
                sx={{
                    ml: 2,
                    flex: 1,
                    height: '2px',
                    backgroundColor: color + '.main',
                    ...sx,
                }}
            ></Box>
        </div>
    );
};

ContentDivider;
