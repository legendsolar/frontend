import type {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material';
import {appTheme} from '@project/components/theme';

export default function App({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={appTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
