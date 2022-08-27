import TransferGridContent from '../transfer_grid_content';
import {testTransfers} from 'static/placeholder_transfers';
import {
    differenceInMonths,
    differenceInQuarters,
    differenceInWeeks,
} from 'date-fns';
import delay from 'utils/delay';

import {useState} from 'react';
import {DataGridDateRange} from 'utils/date_range';

const TestTransferDataGrid = () => {
    const [transfers, setTransfers] = useState<Array<any>>(testTransfers);
    const [asset, setAsset] = useState<string>('');
    const [dateRange, setDateRange] = useState<DataGridDateRange>(
        DataGridDateRange.NONE,
    );

    return (
        <TransferGridContent
            loading={false}
            transfers={transfers}
            onDownloadCsv={() => {
                console.log('onDownloadCsv');
                return delay(1000);
            }}
            onChangeDateRange={(range) => {
                console.log(`onChangeDateRange(${range})`);
                setDateRange(range);
                return delay(1000).then(() => {
                    setTransfers(
                        testTransfers.filter((transfer) => {
                            switch (range) {
                                case DataGridDateRange.WEEK_TO_DATE:
                                    return (
                                        1 >
                                        differenceInWeeks(
                                            new Date(),
                                            new Date(transfer.created),
                                        )
                                    );
                                case DataGridDateRange.MONTH_TO_DATE:
                                    return (
                                        1 >
                                        differenceInMonths(
                                            new Date(),
                                            new Date(transfer.created),
                                        )
                                    );
                                case DataGridDateRange.LAST_SIX_MONTHS:
                                    return (
                                        6 >
                                        differenceInMonths(
                                            new Date(),
                                            new Date(transfer.created),
                                        )
                                    );
                                case DataGridDateRange.YEAR_TO_DATE:
                                    return (
                                        12 >
                                        differenceInMonths(
                                            new Date(),
                                            new Date(transfer.created),
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
                        setTransfers(testTransfers);
                    } else {
                        setTransfers(
                            testTransfers.filter(
                                (transfer) => transfer.facility?.name === asset,
                            ),
                        );
                    }
                });
            }}
            assetState={asset}
            assetStates={['Barnyard Solar', 'None']}
            dateRange={dateRange}
        ></TransferGridContent>
    );
};

export default TestTransferDataGrid;
