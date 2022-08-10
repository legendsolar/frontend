import DefaultComponent from 'components/utils/default_component';

interface RooftopContentProps {
    widgets: JSX.Element;
}

const RooftopContent = ({widgets}: RooftopContentProps) => {
    return (
        <DefaultComponent paper standardWidth={false}>
            {widgets}
        </DefaultComponent>
    );
};

export default RooftopContent;
