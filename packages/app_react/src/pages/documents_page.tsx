import DefaultView from '@project/components/views/default_view';
import {NavBar} from '@project/components/nav/nav_bar';
import useNavBar from '@project/hooks/use_nav_bar';
import DocumentGridContent from '../content/document_grid_content';
import {DataGridDateRange} from '@p/utils/date_range';
import {useEffect, useState} from 'react';
import FullPageView from '@project/components/views/full_page_view';

import EmptyContent from '../content/empty_content';
import delay from '@p/utils/delay';
import {useStorage} from '@project/hooks/use_storage';
import {Document} from '@project/components/documents/types';

const DocumentPage = () => {
    const navBarProps = useNavBar();

    const [documents, setDocuments] = useState<Array<Document>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [asset, setAsset] = useState<string>('');
    const [dateRange, setDateRange] = useState<DataGridDateRange>(
        DataGridDateRange.NONE,
    );

    const {getUserFiles, getUserFilesWithMetaData} = useStorage();

    useEffect(() => {
        setLoading(true);
        getUserFilesWithMetaData().then(data => {
            setDocuments(
                data.map(file => {
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
        });
    }, []);

    const content =
        !loading && documents.length <= 0 ? (
            <EmptyContent />
        ) : (
            <DocumentGridContent
                loading={loading}
                documents={documents}
                onDownloadDocument={() => delay(1000)}
                onChangeDateRange={range => {
                    setDateRange(range);
                    return delay(1000).then(() => {});
                }}
                onChangeAsset={asset => {
                    setAsset(asset);
                    return delay(1000).then(() => {});
                }}
                assetState={asset}
                assetStates={['Barnyard Solar', 'None']}
                dateRange={dateRange}
            ></DocumentGridContent>
        );

    return (
        <FullPageView navBar={<NavBar {...navBarProps}></NavBar>}>
            {content}
        </FullPageView>
    );
};

export default DocumentPage;
