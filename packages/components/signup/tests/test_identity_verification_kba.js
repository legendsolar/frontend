import {IdentityVerificationKBA} from '../identity_verification_kba';

export const TestIdentityVerificationKBA = () => {
    return (
        <IdentityVerificationKBA
            kbaQuestions={[
                {
                    id: 'Question1',
                    text: 'Example Question 1',
                    answers: [
                        {
                            id: 'answerId1',
                            value: 'answerId1',
                            text: 'Answer 1',
                        },

                        {
                            id: 'answerId2',
                            value: 'answerId2',
                            text: 'Answer 2',
                        },

                        {
                            id: 'answerId3',
                            value: 'answerId3',
                            text: 'Answer 3',
                        },

                        {
                            id: 'answerId4',
                            value: 'answerId4',
                            text: 'Answer 4',
                        },
                    ],
                },
                {
                    id: 'Question2',
                    text: 'Example Question 2',
                    answers: [
                        {
                            id: 'answerId1',
                            value: 'answerId1',
                            text: 'Answer 1',
                        },

                        {
                            id: 'answerId2',
                            value: 'answerId2',
                            text: 'Answer 2',
                        },

                        {
                            id: 'answerId3',
                            value: 'answerId3',
                            text: 'Answer 3',
                        },

                        {
                            id: 'answerId4',
                            value: 'answerId4',
                            text: 'Answer 4',
                        },
                    ],
                },

                {
                    id: 'Question3',
                    text: 'Example Question 3',
                    answers: [
                        {
                            id: 'answerId1',
                            value: 'answerId1',
                            text: 'Answer 1',
                        },

                        {
                            id: 'answerId2',
                            value: 'answerId2',
                            text: 'Answer 2',
                        },

                        {
                            id: 'answerId3',
                            value: 'answerId3',
                            text: 'Answer 3',
                        },

                        {
                            id: 'answerId4',
                            value: 'answerId4',
                            text: 'Answer 4',
                        },
                    ],
                },

                {
                    id: 'Question4',
                    text: 'Example Question 4',
                    answers: [
                        {
                            id: 'answerId1',
                            value: 'answerId1',
                            text: 'Answer 1',
                        },

                        {
                            id: 'answerId2',
                            value: 'answerId2',
                            text: 'Answer 2',
                        },

                        {
                            id: 'answerId3',
                            value: 'answerId3',
                            text: 'Answer 3',
                        },

                        {
                            id: 'answerId4',
                            value: 'answerId4',
                            text: 'Answer 4',
                        },
                    ],
                },
            ]}
            onSubmit={(values) => {
                alert('onSubmit: ' + JSON.stringify(values));
            }}
        ></IdentityVerificationKBA>
    );
};
