import PrecommitLetterComponent from '../precommit_letter_component';

const TestPrecommitLetterComponent = () => {
    return (
        <PrecommitLetterComponent
            onComplete={() => alert('complete')}
        ></PrecommitLetterComponent>
    );
};

export default TestPrecommitLetterComponent;
