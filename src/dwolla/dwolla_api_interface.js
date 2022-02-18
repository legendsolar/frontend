import axios from "axios";
import qs from "qs";
import { format } from "date-fns";

export const getIdFromUrl = (urlString) => {
    return new URL(urlString).pathname.split("/").slice(-1)[0];
};

export const getIdFromHeader = (header) => {
    return getIdFromUrl(header.location);
};

export const getBalanceFromWalletData = (walletData) => {
    return walletData.balance.value;
};

export const getTransferAmount = (transfer) => {
    return parseFloat(transfer.amount.value);
};

export const getTransferSourceFundingId = (transfer) => {
    return getIdFromUrl(transfer._links["source-funding-source"].href);
};

export const getTransferDestinationFundingId = (transfer) => {
    return getIdFromUrl(transfer._links["destination-funding-source"].href);
};

export const getTransferSourceCustomerId = (transfer) => {
    return getIdFromUrl(transfer._links.source.href);
};

export const getTransferDestinationCustomerId = (transfer) => {
    return getIdFromUrl(transfer._links.destination.href);
};

export const getTransferStatus = (transfer) => {
    return transfer.status;
};

export const openDwollaConnection = async (url, callWrapper) => {
    const post = async (path, data = {}) => {
        try {
            return (
                await callWrapper({
                    method: "post",
                    url: url + "/" + path,
                    headers: {
                        Accept: "application/vnd.dwolla.v1.hal+json",
                        "Content-Type": "application/json",
                    },
                    data: data,
                })
            ).headers;
        } catch (error) {
            if (error.response) {
                throw JSON.stringify(error.response.data);
            } else {
                throw error;
            }
        }
    };

    const get = async (path, params = null) => {
        const getUrl = params
            ? [url, path, qs.stringify(params)].join("/")
            : [url, path].join("/");

        const resp = await callWrapper({
            method: "get",
            url: getUrl,
            headers: {
                Accept: "application/vnd.dwolla.v1.hal+json",
            },
        });
        return resp.data;
    };

    const createVerifiedCustomer = async ({
        firstName,
        lastName,
        email,
        address1,
        city,
        stateAbbr,
        postalCode,
        dateOfBirth,
        ssn,
        correlationId,
    }) => {
        const data = {
            type: "personal",
            firstName: firstName,
            lastName: lastName,
            email: email,
            address1: address1,
            city: city,
            state: stateAbbr,
            postalCode: postalCode,
            dateOfBirth: format(dateOfBirth, "yyyy-MM-dd"),
            ssn: ssn,
            correlationId: correlationId,
        };

        const resp = await post("customers", data);

        console.log(resp);

        return getIdFromHeader(resp);
    };

    const getCustomerInfo = async (id) => {
        const resp = await get(`customers/${id}`);
        return resp;
    };

    const getCustomerFundingSources = async (customerId) => {
        const resp = await get(`customers/${customerId}/funding-sources`);
        return resp;
    };

    const createTransfer = async (sourceId, destId, amount) => {
        const transferData = {
            _links: {
                source: {
                    href: `${url}/funding-sources/${sourceId}`,
                },
                destination: {
                    href: `${url}/funding-sources/${destId}`,
                },
            },
            amount: {
                currency: "USD",
                value: amount,
            },
            correlationId: "someUUID",
            // optional
            metadata: {},
        };

        const resp = await post("transfers", transferData);

        return getIdFromHeader(resp);
    };

    const getWalletBalance = async (sourceId) => {
        const resp = await get(`funding-sources/${sourceId}/balance`);
        return getBalanceFromWalletData(resp);
    };

    const getTransferById = async (transferId) => {
        const resp = await get(`transfers/${transferId}`);
        return resp;
    };

    const searchTransfersByString = async (customerId, string) => {
        const resp = await get(`customers/${customerId}/transfers`, {
            search: string,
        });
        return resp;
    };

    const searchTransfersByAmount = async (customerId, { start, end }) => {
        const resp = await get(`customers/${customerId}/transfers`, {
            startAmount: start,
            endAmount: end,
        });
        return resp;
    };

    const searchTransfersByDate = async (customerId, { start, end }) => {
        const resp = await get(`customers/${customerId}/transfers`, {
            startDate: start,
            endDate: end,
        });
        return resp;
    };

    const searchTransfersByStatus = async (customerId, status) => {
        const resp = await get(`customers/${customerId}/transfers`, {
            status: status,
        });
        return resp;
    };

    const searchTransfers = async (customerId, searchParams = {}) => {
        const resp = await get(
            `customers/${customerId}/transfers`,
            searchParams
        );
        return resp;
    };

    const getLatestTransfers = async (end, start = 0) => {
        const resp = await get(`customers/${customerId}/transfers`, {
            limit: end - start,
            offset: start,
        });
        return resp;
    };

    const getTransferFee = async (transferId) => {
        const resp = await get(`transfers/${transferId}/fee`);
        return resp;
    };

    const getTransferFailure = async (transferId) => {
        const resp = await get(`transfers/${transferId}/failure`);
        return resp;
    };

    const cancelTransfer = async (transferId) => {
        const resp = await post(`transfers/${transferId}/`, {
            status: "cancelled",
        });
        return resp;
    };

    return {
        createVerifiedCustomer,
        getCustomerInfo,
        getCustomerFundingSources,
        createTransfer,
        getWalletBalance,
        getLatestTransfers,

        searchTransfers,
        searchTransfersByStatus,
        searchTransfersByDate,
        searchTransfersByString,
        searchTransfersByAmount,

        getTransferById,
        getTransferFee,
        getTransferFailure,
        cancelTransfer,
    };
};
