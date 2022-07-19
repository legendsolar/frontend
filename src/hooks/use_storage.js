import React, {useState, useEffect, useContext, createContext} from 'react';
import {useDatabase, useFirebaseApp, useStorageDownloadURL} from 'reactfire';
import {
    listAll,
    list,
    getStorage,
    ref,
    getMetadata,
    getDownloadURL,
} from 'firebase/storage';
import {useAuth} from 'hooks/use_auth';

const storageContext = createContext();
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

function useProvideStorage() {
    const app = useFirebaseApp();
    const storage = getStorage(app);

    const {user} = useAuth();

    // complete hack... need to update this ASAP

    const getUserFiles = async () => {
        const listRef = ref(storage, `${user.uid}/r`);

        return listAll(listRef, {maxResults: 10}); // returns refs
    };

    const getUserFilesWithMetaData = async () => {
        const listRef = ref(storage, `${user.uid}/r`);

        const refs = (await listAll(listRef, {maxResults: 10})).items; // returns refs

        return Promise.all(
            refs.map(async (ref) => ({
                metadata: await getMetadata(ref),
                ref: ref,
                link: await getDownloadURL(ref),
            })),
        );
    };

    return {
        getUserFiles,
        getUserFilesWithMetaData,
    };
}
