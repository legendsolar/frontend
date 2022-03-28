import { Typography } from "@mui/material";
import Airtable from "airtable";
import { useState, useEffect } from "react";

const AirtableTestPage = () => {
    const [solarTable, setSolarTable] = useState(null);

    const [records, setRecords] = useState([]);

    useEffect(() => {
        Airtable.configure({
            endpointUrl: "https://api.airtable.com",
            apiKey: "keyPC2WvTDdt623Yv",
        });

        const base = Airtable.base("appCuKA1pZiCb6bEV");

        console.log(base);

        const solarTable = base("tblnbe8C7jO4IFCs3");

        console.log(solarTable);

        solarTable.selectRecordsAsync().then((result) => {
            const records = result.records;
            console.log(records);
            setRecords(records);
        });
    }, []);
    return (
        <div>
            <Typography>Airtable Test</Typography>
            {records.forEach((record) => {
                console.log(record);
                {
                    /* return (
                    <div>
                        <Typography>{page.id}</Typography>
                        <Typography>{page.fields.City}</Typography>
                    </div>
                ); */
                }
            })}
        </div>
    );
};

export default AirtableTestPage;
