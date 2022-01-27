import { useState } from "react";
import { database } from "../../Firebase";
import { ref } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import Worm from "./worm";
import { setDate } from "date-fns";

export default function WormLive(props) {
    const assetId = props.assetId;
    const unitConversionFactor_kW = props.unitConversionFactor_kW;
    const displayOptions = props.displayOptions;

    var error = true;
    var loading = true;
    var data = [
        {
            time: 1642554300000,
            wattage: 0,
        },
        {
            time: 1642556400000,
            wattage: 5000,
        },
        {
            time: 1642557600000,
            wattage: 0,
        },
        {
            time: 1642559700000,
            wattage: 0,
        },
    ];

    // const [data, setData] = useState([
    //     {
    //         time: 1642554300000,
    //         wattage: 0,
    //     },
    //     {
    //         time: 1642556400000,
    //         wattage: 5000,
    //     },
    //     {
    //         time: 1642557600000,
    //         wattage: 0,
    //     },
    //     {
    //         time: 1642559700000,
    //         wattage: 0,
    //     },
    // ]);

    const [assetProdSnap, assetProdLoading, assetProdError] = useObject(
        ref(database, "production/" + assetId + "/history_raw")
    );

    if (assetProdLoading) {
        loading = true;
    } else if (assetProdSnap && !assetProdLoading && !assetProdError) {
        // transform into array for d3 to process
        data = Object.values(assetProdSnap.val());
    } else {
        error = true;
    }
    return <Worm data={data}></Worm>;
}
