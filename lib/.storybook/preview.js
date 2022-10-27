import React from 'react';

import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../src/theme/theme.js';

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};
addDecorator((story) => (
  <ThemeProvider theme={appTheme}>{story()}</ThemeProvider>
));

// export const decorators = [
//   <ThemeProvider theme={appTheme}>{story()}</ThemeProvider>,
// ];
