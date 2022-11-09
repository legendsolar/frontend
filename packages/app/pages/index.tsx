import React, {useState} from 'react';
import {LivePill, ReactFromModule} from '@project/components/pills';

export default function Index() {
    console.log(React === ReactFromModule);

    const [state, setState] = useState('test');
    return <div>{state}</div>;
}
