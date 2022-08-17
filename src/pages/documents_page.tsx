import DefaultView from 'views/default_view';
import NavBar from 'components/utils/nav_bar';
import useNavBar from 'hooks/use_nav_bar';
import DocumentGridContent from 'content/document_grid_content';
import FullPageView from 'views/full_page_view';
import {DataGridDateRange} from 'utils/date_range';
import {useEffect, useState} from 'react';
import {documents} from 'static_data/placeholder_documents';

import {
    differenceInMonths,
    differenceInQuarters,
    differenceInWeeks,
} from 'date-fns';
import delay from 'utils/delay';
import {documents as testDocuments} from 'static_data/placeholder_documents';
import {useStorage} from 'hooks/use_storage';

const DocumentPage = () => {
    const navBarProps = useNavBar();

    const [documents, setDocuments] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [asset, setAsset] = useState<string>('');
    const [dateRange, setDateRange] = useState<DataGridDateRange>(
        DataGridDateRange.NONE,
    );

    const {getUserFiles, getUserFilesWithMetaData} = useStorage();

    useEffect(() => {
        setLoading(true);
        getUserFilesWithMetaData().then((data) => {
            setLoading(false);
            setDocuments(
                data.map((file) => {
                    return {
                        id: file?.metadata?.fullPath,
                        name: file?.metadata?.customMetadata.displayName,
                        type: file?.metadata?.customMetadata.documentType,
                        created: file?.metadata?.timeCreated,
                        facility: file?.metadata?.customMetadata.asset,
                        downloadLink: file?.link,
                    };
                }),
            );
        });
    }, []);

    return (
        <DefaultView navBar={<NavBar {...navBarProps}></NavBar>}>
            <DocumentGridContent
                loading={loading}
                documents={documents}
                onDownloadDocument={() => delay(1000)}
                onChangeDateRange={(range) => {
                    console.log(`onChangeDateRange(${range})`);
                    setDateRange(range);
                    return delay(1000).then(() => {
                        setDocuments(
                            testDocuments.filter((doc) => {
                                switch (range) {
                                    case DataGridDateRange.WEEK_TO_DATE:
                                        return (
                                            1 >
                                            differenceInWeeks(
                                                new Date(),
                                                new Date(doc.created),
                                            )
                                        );
                                    case DataGridDateRange.MONTH_TO_DATE:
                                        return (
                                            1 >
                                            differenceInMonths(
                                                new Date(),
                                                new Date(doc.created),
                                            )
                                        );
                                    case DataGridDateRange.LAST_SIX_MONTHS:
                                        return (
                                            6 >
                                            differenceInMonths(
                                                new Date(),
                                                new Date(doc.created),
                                            )
                                        );
                                    case DataGridDateRange.YEAR_TO_DATE:
                                        return (
                                            12 >
                                            differenceInMonths(
                                                new Date(),
                                                new Date(doc.created),
                                            )
                                        );
                                }
                                return true;
                            }),
                        );
                    });
                }}
                onChangeAsset={(asset) => {
                    console.log(`onChangeAsset(${asset})`);
                    setAsset(asset);
                    return delay(1000).then(() => {
                        if (asset === 'None') {
                            setDocuments(testDocuments);
                        } else {
                            setDocuments(
                                testDocuments.filter(
                                    (doc: any) => doc.facility?.name === asset,
                                ),
                            );
                        }
                    });
                }}
                assetState={asset}
                assetStates={['Barnyard Solar', 'None']}
                dateRange={dateRange}
            ></DocumentGridContent>
        </DefaultView>
    );
};

export default DocumentPage;
