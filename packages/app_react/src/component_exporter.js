import {ThemeProvider} from '@mui/material/styles';
import {appTheme} from '@project/components/theme';
import {lazy, Suspense} from 'react';

const ComponentExporter = () => {
    const ComponentToExport = lazy(() =>
        import(
            './components/calculator/tests/test_airtable_returns_calculator'
        ),
    );

    return (
        <ThemeProvider theme={appTheme}>
            <Suspense fallback={<></>}>
                <div>
                    <ComponentToExport />
                </div>
            </Suspense>
        </ThemeProvider>
    );
};

export default ComponentExporter;
