import {getFunctions, httpsCallable} from 'firebase/functions';
import {useFirebaseApp} from 'reactfire';

export const useCloudFunctions = () => {
    const app = useFirebaseApp();
    const functions = getFunctions(app);

    const downloadAllTransfers = httpsCallable(
        functions,
        'downloadAllTransfers',
    );

    return {
        downloadAllTransfers: async () => {
            return (await downloadAllTransfers()).data;
        },
    };
};
