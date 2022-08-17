import DefaultView from 'views/default_view';
import NavBar from 'components/utils/nav_bar';
import useNavBar from 'hooks/use_nav_bar';
import {testTransfers} from 'static_data/placeholder_transfers';
import TransferGridContent from 'content/transfer_grid_content';
import {DataGridDateRange} from 'utils/date_range';

import {
    differenceInMonths,
    differenceInQuarters,
    differenceInWeeks,
} from 'date-fns';
import delay from 'utils/delay';

import {useState} from 'react';
import FullPageView from 'views/full_page_view';

const TransactionPage = () => {
    const navBarProps = useNavBar();
    const [transfers, setTransfers] = useState<Array<any>>(testTransfers);
    const [asset, setAsset] = useState<string>('');
    const [dateRange, setDateRange] = useState<DataGridDateRange>(
        DataGridDateRange.NONE,
    );

    return (
        <DefaultView navBar={<NavBar {...navBarProps}></NavBar>}>
            <TransferGridContent
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
                                    (transfer) =>
                                        transfer.facility?.name === asset,
                                ),
                            );
                        }
                    });
                }}
                assetState={asset}
                assetStates={['Barnyard Solar', 'None']}
                dateRange={dateRange}
            ></TransferGridContent>
        </DefaultView>
    );
};

export default TransactionPage;
