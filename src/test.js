import ComponentView from 'component_view';
import {appTheme} from 'app_theme';
import {ThemeProvider} from '@mui/material/styles';

const TestApp = () => {
    return (
        <ThemeProvider theme={appTheme}>
            <ComponentView></ComponentView>
        </ThemeProvider>
    );
};

export default TestApp;
