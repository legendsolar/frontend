import { DataGrid } from "@mui/x-data-grid";

const columns = [
    {
        field: "id",
        headername: "ID",
        width: 50,
    },
    {
        field: "date",
        headername: "Date",
        width: 150,
        editable: false,
    },
    {
        field: "type",
        headerName: "Type",
        width: 120,
        editable: false,
    },
    {
        field: "status",
        headerName: "Status",
        width: 110,
        editable: false,
    },
    {
        field: "from",
        headerName: "From",
        width: 180,
        editable: false,
    },
    {
        field: "to",
        headerName: "To",
        width: 180,
        editable: false,
    },
    {
        field: "amount",
        headerName: "Amount",
        width: 110,
        editable: false,
    },
];

const rows = [
    {
        id: 0,
        date: "June 10, 2022",
        type: "Dividend",
        status: "Pending",
        from: "Legends SPV",
        to: "Legends Wallet",
        amount: "$145.76",
    },
    {
        id: 1,
        date: "May 10, 2022",
        type: "Dividend",
        status: "Complete",
        from: "Legends SPV",
        to: "Legends Wallet",
        amount: "$195.76",
    },
    {
        id: 2,
        date: "April 10, 2022",
        type: "Dividend",
        status: "Complete",
        from: "Legends SPV",
        to: "Legends Wallet",
        amount: "$125.76",
    },
    {
        id: 3,
        date: "March 10, 2022",
        type: "Dividend",
        status: "Complete",
        from: "Legends SPV",
        to: "Legends Wallet",
        amount: "$165.76",
    },
    {
        id: 4,
        date: "March 5, 2022",
        type: "Investment",
        status: "Complete",
        from: "Bank of America",
        to: "Legends SPV",
        amount: "$25,000",
    },
];

const AllTransfersDataGrid = (props) => {
    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
};

export default AllTransfersDataGrid;
