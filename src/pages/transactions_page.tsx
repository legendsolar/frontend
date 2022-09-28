import DefaultView from 'views/default_view';
import NavBar from 'components/utils/nav_bar';
import useNavBar from 'hooks/use_nav_bar';
import {testTransfers} from 'static/placeholder_transfers';
import TransferGridContent from 'content/transfer_grid_content';
import {DataGridDateRange} from 'utils/date_range';
import EmptyContent from 'content/empty_content';
import delay from 'utils/delay';
import FullPageView from 'views/full_page_view';
import {useEffect, useState} from 'react';
import {useTransfer} from 'hooks/use_transfer';
import {useCloudFunctions} from 'hooks/use_cloud_functions';

const TransactionPage = () => {
    const navBarProps = useNavBar();
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

    const content =
        !loading && recentTransfers?.length <= 0 ? (
            <EmptyContent
                messageOverride={`You haven't received any transactions yet`}
            ></EmptyContent>
        ) : (
            <TransferGridContent
                loading={recentTransfersLoading || loading}
                transfers={recentTransfers}
                onDownloadCsv={async () => {
                    try {
                        setLoading(true);
                        const out: any = await downloadAllTransfers();
                        window.open(out.downloadLink);
                        setLoading(false);
                        return;
                    } catch (e) {
                        setLoading(false);
                    }
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
        );

    const {downloadAllTransfers} = useCloudFunctions();

    return (
        <FullPageView navBar={<NavBar {...navBarProps}></NavBar>}>
            {content}
        </FullPageView>
    );
};

export default TransactionPage;
