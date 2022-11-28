import DefaultView from '@project/components/views/default_view';
import {NavBar} from '@project/components/nav/nav_bar';
import useNavBar from '@project/hooks/use_nav_bar';
import {testTransfers} from '../static/placeholder_transfers';
import TransferGridContent from '../content/transfer_grid_content';
import {DataGridDateRange} from '@p/utils/date_range';
import EmptyContent from '../content/empty_content';
import delay from '@p/utils/delay';
import FullPageView from '@project/components/views/full_page_view';
import {useEffect, useState} from 'react';
import {useTransfer} from '@project/hooks/use_transfer';
import {useCloudFunctions} from '@project/hooks/use_cloud_functions';

const TransactionPage = () => {
    const navBarProps = useNavBar();
    const [asset, setAsset] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [link, setLink] = useState<string | undefined>(undefined);
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

    useEffect(() => {
        downloadAllTransfers().then((link) => setLink(link));
    }, []);

    const content =
        (!recentTransfers && !recentTransfersLoading) || recentError ? (
            <EmptyContent
                messageOverride={`You haven't received any transactions yet`}
            ></EmptyContent>
        ) : (
            <TransferGridContent
                loading={recentTransfersLoading || loading}
                transfers={recentTransfers}
                onDownloadCsv={
                    link
                        ? () => {
                              window.open(link);
                          }
                        : undefined
                }
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

    return (
        <FullPageView navBar={<NavBar {...navBarProps}></NavBar>}>
            {content}
        </FullPageView>
    );
};

export default TransactionPage;
