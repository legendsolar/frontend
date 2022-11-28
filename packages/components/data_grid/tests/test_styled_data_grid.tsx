import {format} from 'date-fns';
import {StyledDataGrid} from '../styled_data_grid';

export default () => {
    const count = 20;

    const fakeTxs = Array.from({length: count}, (_, i) => ({
        id: i,
        from: 'Chase',
        to: 'Wallet',
        amount: '$' + (Math.random() * (i + 10)).toFixed(2),
        date: new Date(),
    }));

    return (
        <StyledDataGrid
            columns={[
                {
                    field: 'from',
                    headerName: 'From',
                    minWidth: 130,
                    flex: 1,
                    editable: false,
                },
                {
                    field: 'to',
                    headerName: 'To',
                    minWidth: 90,
                    flex: 1,
                    editable: false,
                },
                {
                    field: 'amount',
                    headerName: 'Amount',
                    minWidth: 70,
                    flex: 1,
                    editable: false,
                },
                {
                    field: 'date',
                    headerName: 'Date',
                    minWidth: 110,
                    flex: 1,
                    editable: false,
                    valueFormatter: (params) =>
                        format(params?.value as Date, 'P'),
                },
            ]}
            rows={fakeTxs}
            loading={false}
        ></StyledDataGrid>
    );
};
