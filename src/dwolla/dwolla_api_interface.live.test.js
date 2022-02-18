import { dwollaSandboxConfig } from "./dwolla_settings.js";
import {
    openDwollaConnection,
    getTransferDestinationCustomerId,
    getTransferDestinationFundingId,
    getTransferSourceCustomerId,
    getTransferSourceFundingId,
    getTransferAmount,
    getTransferStatus,
} from "./dwolla_api_interface.js";
import { dwollaCallWrapper } from "./dwolla_api_wrapper.js";

const testUser = {
    id: "dac731a7-d7f5-45db-98db-af6a3612b0e8",
    name: "",
    email: "testEmail@none.com",
    state: "CA",
    zip: "12345",
    city: "testCity",
    address1: "testAddrLine1",
    walletId: "c2c47973-f10a-4414-bb42-58c16313d0ad",
    bankId: "5c44ec3d-c78a-4580-93d4-7b9f59b1ade3",
};

const ourWalletId = "43edfcf3-6bed-481e-8187-75a7f90cc7d4";
const ourBankId = "75a7874e-d14c-42c2-b4dd-84f9991ba3de";
const ourId = "07a942a0-307e-4ff7-8f8d-34fec79bf0a8";

test("live test dwolla api create customer", async () => {
    const now = Date.now();

    const dwolla = await openDwollaConnection(
        dwollaSandboxConfig.url,
        dwollaCallWrapper
    );

    const user = {
        firstName: "testFirstName",
        lastName: "testLastName",
        email: `testEmail${now}@none.com`,
        address1: "testAddrLine1",
        city: "testCity",
        stateAbbr: "CA",
        postalCode: "12345",
    };

    const protectedUserData = {
        dateOfBirth: new Date("1990-01-01"),
        ssn: "1234",
    };

    const id = await dwolla.createVerifiedCustomer({
        ...user,
        ...protectedUserData,
    });

    await new Promise((r) => setTimeout(r, 1000));

    const info = await dwolla.getCustomerInfo(id);

    expect({
        id: info.id,
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        address1: info.address1,
        city: info.city,
        stateAbbr: info.state,
        postalCode: info.postalCode,
    }).toEqual({
        id: id,
        ...user,
    });
});

test("live test dwolla api create a wallet to wallet transfer", async () => {
    const dwolla = await openDwollaConnection(
        dwollaSandboxConfig.url,
        dwollaCallWrapper
    );

    const transferId = await dwolla.createTransfer(
        ourWalletId,
        testUser.walletId,
        1.19
    );

    const transfer = await dwolla.getTransferById(transferId);

    expect(getTransferAmount(transfer)).toEqual(1.19);
    expect(getTransferDestinationFundingId(transfer)).toEqual(
        testUser.walletId
    );
    expect(getTransferDestinationCustomerId(transfer)).toEqual(testUser.id);
    expect(getTransferSourceCustomerId(transfer)).toEqual(ourId);
    expect(getTransferSourceFundingId(transfer)).toEqual(ourWalletId);
    expect(getTransferStatus(transfer)).toEqual("processed");
});

test("live test dwolla api create a bank to wallet transfer", async () => {
    const dwolla = await openDwollaConnection(
        dwollaSandboxConfig.url,
        dwollaCallWrapper
    );

    const transferId = await dwolla.createTransfer(
        ourBankId,
        testUser.walletId,
        0.19
    );

    const transfer = await dwolla.getTransferById(transferId);

    expect(getTransferAmount(transfer)).toEqual(0.19);
    expect(getTransferDestinationFundingId(transfer)).toEqual(
        testUser.walletId
    );
    expect(getTransferDestinationCustomerId(transfer)).toEqual(testUser.id);
    expect(getTransferSourceCustomerId(transfer)).toEqual(ourId);
    expect(getTransferSourceFundingId(transfer)).toEqual(ourBankId);
    expect(getTransferStatus(transfer)).toEqual("pending");
});

test("live test dwolla api create a bank to bank transfer", async () => {
    const dwolla = await openDwollaConnection(
        dwollaSandboxConfig.url,
        dwollaCallWrapper
    );

    const transferId = await dwolla.createTransfer(
        ourBankId,
        testUser.bankId,
        0.29
    );

    const transfer = await dwolla.getTransferById(transferId);

    expect(getTransferAmount(transfer)).toEqual(0.29);
    expect(getTransferDestinationFundingId(transfer)).toEqual(testUser.bankId);
    expect(getTransferDestinationCustomerId(transfer)).toEqual(testUser.id);
    expect(getTransferSourceCustomerId(transfer)).toEqual(ourId);
    expect(getTransferSourceFundingId(transfer)).toEqual(ourBankId);
    expect(getTransferStatus(transfer)).toEqual("pending");
});
