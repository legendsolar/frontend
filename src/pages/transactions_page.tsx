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

import {useEffect, useState} from 'react';
import {useTransfer} from 'hooks/use_transfer';
import {useCloudFunctions} from 'hooks/use_cloud_functions';

const TransactionPage = () => {
    const navBarProps = useNavBar();
    const [transfers, setTransfers] = useState<Array<any>>([]);
    const [asset, setAsset] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [dateRange, setDateRange] = useState<DataGridDateRange>(
        DataGridDateRange.NONE,
    );

    const {useRecentTransfers} = useTransfer();

    const {
        loading: recentTransfersLoading,
        error: recentError,
        transfers: recentTransfers,
    } = useRecentTransfers(25);

    const {downloadAllTransfers} = useCloudFunctions();

    return (
        <DefaultView navBar={<NavBar {...navBarProps}></NavBar>}>
            <TransferGridContent
                loading={recentTransfersLoading || loading}
                transfers={recentTransfers}
                onDownloadCsv={async () => {
                    setLoading(true);
                    const out: any = await downloadAllTransfers();
                    window.open(out.downloadLink);
                    setLoading(false);
                    return;
                }}
                onChangeDateRange={(range) => {
                    setDateRange(range);
                    return Promise.resolve();
                }}
                onChangeAsset={(asset) => {
                    setAsset(asset);
                    return delay(1000).then(() => {
                        return Promise.resolve();
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
