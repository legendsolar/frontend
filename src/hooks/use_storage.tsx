import React, {
    useState,
    useEffect,
    useContext,
    createContext,
    useMemo,
} from 'react';
import {useDatabase, useFirebaseApp, useStorageDownloadURL} from 'reactfire';
import {
    listAll,
    list,
    getStorage,
    ref,
    getMetadata,
    getDownloadURL,
    ListResult,
    StorageReference,
    FullMetadata,
} from 'firebase/storage';
import {useAuth} from 'hooks/use_auth';
import {Document} from 'components/documents/types';
import {boolean} from 'yup';

const storageContext = createContext<useStorageReturnType>(
    {} as useStorageReturnType,
);
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideStorage({children}) {
    const storage = useProvideStorage();
    return (
        <storageContext.Provider value={storage}>
            {children}
        </storageContext.Provider>
    );
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useStorage = () => {
    return useContext(storageContext);
};

interface useStorageReturnType {
    getUserFiles(): Promise<ListResult>;
    getUserFilesWithMetaData(): Promise<
        Array<{metadata: FullMetadata; ref: StorageReference; link: string}>
    >;
    useUserDocuments(): {loading: boolean; documents: Array<Document>};
}

const useProvideStorage = (): useStorageReturnType => {
    const app = useFirebaseApp();
    const storage = getStorage(app);

    const {user} = useAuth();

    // complete hack... need to update this ASAP

    const getUserFiles = async () => {
        const listRef = ref(storage, `${user.uid}/r`);

        return listAll(listRef); // returns refs
    };

    const getUserFilesWithMetaData = async () => {
        const listRef = ref(storage, `${user.uid}/r`);

        const refs = (await listAll(listRef)).items; // returns refs

        return Promise.all(
            refs.map(async (ref) => ({
                metadata: await getMetadata(ref),
                ref: ref,
                link: await getDownloadURL(ref),
            })),
        );
    };

    const useUserDocuments = () => {
        const [loading, setLoading] = useState<boolean>(false);
        const [documents, setDocuments] = useState<Array<Document>>([]);

        useMemo(async () => {
            setLoading(true);

            const data = await getUserFilesWithMetaData();

            setDocuments(
                data.map((file) => {
                    return {
                        id: file?.metadata?.fullPath,
                        name:
                            file?.metadata?.customMetadata?.displayName ||
                            'well',
                        type:
                            file?.metadata?.customMetadata?.documentType ||
                            'test',
                        created: new Date(file?.metadata?.timeCreated),
                        facility:
                            file?.metadata?.customMetadata?.asset || 'test',
                        downloadLink: file?.link,
                    } as Document;
                }),
            );

            setLoading(false);
        }, []);

        return {
            loading,
            documents,
        };
    };

    return {
        getUserFiles,
        getUserFilesWithMetaData,
        useUserDocuments,
    };
};
