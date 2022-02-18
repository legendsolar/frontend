import * as ut from "./dwolla_api_wrapper.js";

beforeEach(() => {
    jest.useFakeTimers().setSystemTime(0);
});

test("live test dwolla api wrapper get auth token", async () => {
    const authToken = await ut.getAuthToken("https://api-sandbox.dwolla.com");

    expect(authToken.access_token).toBeTruthy();
    expect(authToken.expires_in > 3000).toBeTruthy();
    expect(authToken.token_type).toBe("Bearer");
    expect(authToken.expireTime > 3000 * 1000).toBeTruthy();
});

afterEach(() => {
    jest.useRealTimers();
});
