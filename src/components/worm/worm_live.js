import { useEffect, useState } from "react";
import { database } from "../../Firebase";
import { get, query, orderByKey, ref, startAt, endAt } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import Worm from "./worm";
import { subWeeks, setDate } from "date-fns";

export default function WormLive(props) {
    const assetId = props.assetId;
    const unitConversionFactor_kW = props.unitConversionFactor_kW;
    const displayOptions = props.displayOptions;

    const [data, setData] = useState([
        {
            time: 0,
            wattage: 0,
        },
    ]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // For now, load in chart data once, no updates
    useEffect(() => {
        const startDate = subWeeks(new Date(), 1);
        get(
            query(
                ref(database, "production/" + assetId + "/history_raw"),
                orderByKey(),
                startAt(startDate.getTime().toString())
            )
        )
            .then((snapshot) => {
                console.log("data object returned");
                // clean, reformat data
                let newData = [];

                for (let i in snapshot.val()) {
                    const obj = snapshot.val()[i];
                    if ("time" in obj && "wattage" in obj) {
                        newData.push(obj);
                    }
                }
                setData(newData);
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            });
    }, [assetId]);

    if (loading || error) {
        return <></>;
    }

    return <Worm rawData={data} loading={loading} error={error}></Worm>;
}
