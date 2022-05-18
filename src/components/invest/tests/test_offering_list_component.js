import OfferingListComponent from '../offering_list_component';
import {investments} from './defaults';
import {useRef} from 'react';

const TestOfferingListComponent = () => {
    const contentRefs = useRef([]);
    return (
        <OfferingListComponent
            offerings={investments}
            refs={contentRefs}
        ></OfferingListComponent>
    );
};

export default TestOfferingListComponent;
