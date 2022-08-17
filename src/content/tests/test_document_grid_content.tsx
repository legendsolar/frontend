import DocumentGridContent from 'content/document_grid_content';
import {
    differenceInMonths,
    differenceInQuarters,
    differenceInWeeks,
} from 'date-fns';
import delay from 'utils/delay';

import {DataGridDateRange} from 'utils/date_range';
import {useState} from 'react';
import {documents as testDocuments} from 'static_data/placeholder_documents';

const TestTransferDataGrid = () => {
    const [documents, setDocuments] = useState<Array<any>>(testDocuments);
    const [asset, setAsset] = useState<string>('');
    const [dateRange, setDateRange] = useState<DataGridDateRange>(
        DataGridDateRange.NONE,
    );

    return (
        <DocumentGridContent
            loading={false}
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
    );
};

export default TestTransferDataGrid;
