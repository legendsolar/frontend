import {Records, FieldSet} from 'airtable';
import React, {
    useState,
    useEffect,
    useContext,
    createContext,
    useMemo,
} from 'react';
import {useDatabase} from 'reactfire';
import {initAirtable} from './airtable_init';

const airtableContext = createContext<useAirtableReturnType>(
    {} as useAirtableReturnType,
);
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAirtable({children}) {
    const airtable = useProvideAirtable();
    return (
        <airtableContext.Provider value={airtable}>
            {children}
        </airtableContext.Provider>
    );
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAirtable = () => {
    return useContext(airtableContext);
};

interface useAirtableReturnType {
    useBase(baseName: string): {
        loading: boolean;
        page: Records<FieldSet>;
        fetchNextPage(): void;
    };
}

const useProvideAirtable = (): useAirtableReturnType => {
    const base = initAirtable();

    const useBase = (baseName: string) => {
        const [loading, setLoading] = useState(false);
        const [page, setPage] = useState<Records<FieldSet>>([]);
        const [fetchNext, setFetchNext] = useState<() => void>();

        useMemo(() => {
            setLoading(true);
            base(baseName)
                .select({maxRecords: 20, view: 'Grid view'})
                .eachPage((records, fetchNextPage) => {
                    setPage(records);
                    setLoading(false);
                    setFetchNext(fetchNextPage);
                })
                .finally(() => setLoading(false));
        }, [baseName]);

        return {
            loading,
            page,
            fetchNextPage: () => {
                setLoading(true);
                if (fetchNext) {
                    fetchNext();
                }
            },
        };
    };

    return {useBase};
};
