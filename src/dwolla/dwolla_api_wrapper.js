import axios from "axios";
import qs from "qs";
import * as functions from "firebase-functions";
/**
 *     Persisted Auth Token
 *     Can be used for multiple calls if function instance is warm
 * */
var persistedAuthToken = { expireTime: 0 };

const getAuthToken = async (url) => {
    const data = qs.stringify({
        grant_type: "client_credentials",
        client_id: "PJXKzWgEVmvSUGiTt4iDhDBYUjsVg2yobgTq0K3T8Jznxvpaam",
        client_secret: "lIxC1DCCAb1qLe6ryAoDB8MKxQ03bnY3yn8dEbYpZxR45wKXlb",
    });

    const authToken = await axios({
        method: "post",
        url: url + "/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
    });

    persistedAuthToken = {
        ...authToken.data,
        expireTime: authToken.data.expires_in * 1000 + Date.now(),
    };

    return persistedAuthToken;
};

const getBearerToken = (token) => {
    return ["Bearer", token].join(" ");
};

const dwollaCallWrapper = async (callObject) => {
    const baseUrl = new URL(callObject.url);

    if (Date.now() > persistedAuthToken.expireTime) {
        await getAuthToken(baseUrl.origin);
    }

    callObject.headers["Authorization"] = getBearerToken(
        persistedAuthToken.access_token
    );

    const dwollaReturn = await axios(callObject);

    return dwollaReturn;
};

const dwollaCallWrapper_https = functions.https.onCall(
    async (data, context) => {
        /**
         * TODO could filter on disallowed routes or parameters
         * to limit front end functionality
         */

        return dwollaCallWrapper(data);
    }
);

export {
    getAuthToken,
    getBearerToken,
    dwollaCallWrapper,
    dwollaCallWrapper_https,
};
