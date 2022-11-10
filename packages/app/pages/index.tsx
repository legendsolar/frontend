import React, {useState} from 'react';

import {useTheme} from '@mui/material';
import {Test} from '@project/components/basics';

export default function Index() {
    const [state, setState] = useState('test');
    const theme = useTheme();
    return (
        <div>
            {theme.palette.primary.main}
            <Test></Test>
        </div>
    );
}
