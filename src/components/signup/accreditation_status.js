import {Button, CircularProgress} from '@mui/material';
import {useState} from 'react';
import CheckboxList from 'components/inputs/checkbox_list';
import {useAuth} from 'hooks/use_auth';
import {useUser} from 'hooks/use_user';
import Divider from 'components/basics/divider';

const AccreditationStatus = ({
    onComplete,
    completeButtonMessage,
    completed,
}) => {
    const auth = useAuth();
    const user = auth.user;

    const [accreditationOptionsList, setAccreditationOptionsList] = useState({
        INCOME: {
            title: 'Income',
            description:
                'I earn $200,000 yearly, or $300,000 with my spousal equivalant',
            accredited: true,
            attribute: 'INCOME',
        },
        NET_WORTH: {
            title: 'Personal Net Worth',
            description:
                'I have $1,000,000 in assets, excluding my primary residence',
            accredited: true,
            attribute: 'NET_WORTH',
        },
        LICENSE_HOLDER: {
            title: 'License Holder',
            description:
                'I hold a Series 7, 65, or 82 license currently in good standing',
            accredited: true,
            attribute: 'LICENSE_HOLDER',
        },
        ENTITY_OWNER: {
            title: 'Entity Owner',
            description:
                'I own an entity (e.g. family office) with $5,000,000+ in assets',
            accredited: true,
            attribute: 'ENTITY_OWNER',
        },
        NONE: {
            title: 'None of the above',
            description: 'I am not an accredited investor',
            exclusive: true,
            accredited: false,
            attribute: 'NONE',
        },
    });

    const [checkedList, setCheckedList] = useState(null);

    const {useGetUserAccreditation, useSetUser} = useUser();
    const {loading, error, data} = useGetUserAccreditation();
    const [setUser] = useSetUser();

    if (loading) {
        return <></>;
    }

    // const database = useDatabase();
    // const {status, data: userInfo} = useDatabaseObjectData(
    //     ref(database, 'users/' + user.uid),
    // );

    // useEffect(() => {
    //     if (status == 'success') {
    //         if (
    //             userInfo &&
    //             userInfo.accreditation &&
    //             userInfo.accreditation.attributes
    //         ) {
    //             const list = {};
    //             Object.entries(userInfo.accreditation.attributes).map(
    //                 ([key, val]) => {
    //                     list[key] = val.status;
    //                 },
    //             );
    //             setCheckedList(list);
    //         }
    //     }
    // }, [status]);

    const onContinueClick = () => {
        //     var accreditationStatus = 'NOT_ACCREDITED';
        //     const accreditationAttributes = Object.fromEntries(
        //         Object.entries(checkedList).map(([key, checked]) => {
        //             if (checked && accreditationOptionsList[key].accredited) {
        //                 accreditationStatus = 'ACCREDITED';
        //             }
        //             return [
        //                 key,
        //                 {
        //                     status: checked,
        //                     attribute: accreditationOptionsList[key].attribute,
        //                 },
        //             ];
        //         }),
        //     );
        //     const databaseObject = {
        //         status: accreditationStatus,
        //         attributes: accreditationAttributes,
        //     };
        //     setLoading(true);
        //     set(
        //         ref(database, 'users/' + user.uid + '/accreditation/'),
        //         databaseObject,
        //     ).then(() => {
        //         setLoading(false);
        //         onComplete();
        //     });
        console.log(checkedList);

        setUser({
            variables: {
                input: {
                    accreditation: Object.keys(checkedList).filter(
                        (key) => checkedList[key],
                    ),
                },
            },
        });
    };

    return (
        <div>
            <div style={{margin: '10px 0px 0px 0px'}}>
                <Divider></Divider>

                <CheckboxList
                    options={accreditationOptionsList}
                    precheckedList={checkedList}
                    onInputChange={(checkboxListChecked) => {
                        setCheckedList(checkboxListChecked);
                    }}
                    disabled={completed}
                ></CheckboxList>

                <Divider></Divider>
            </div>

            {!completed && (
                <Button
                    sx={{
                        width: '100%',
                        mt: 4,
                    }}
                    variant="primary"
                    disabled={
                        (checkedList &&
                            !Object.keys(checkedList).some(
                                (k) => checkedList[k],
                            )) ||
                        loading
                    }
                    onClick={() => onContinueClick()}
                >
                    {loading ? (
                        <CircularProgress color="light" size={30} />
                    ) : (
                        'Continue'
                    )}
                </Button>
            )}
        </div>
    );
};

export default AccreditationStatus;
