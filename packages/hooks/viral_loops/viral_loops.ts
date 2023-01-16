import { removeNullObjectValues } from "@p/utils";

export interface ViralLoopsUser {
  referralCode: string;
  isNew: boolean;
}

export interface NewViralLoopsUserInput {
  email: string;
  firstName: string | undefined;
  lastName: string | undefined;
}

export const storeViralLoopsStoredData = (
  viralLoopsCampaignId: string,
  data: any
) => {
  localStorage.setItem(viralLoopsCampaignId + "#user", data);
};

export const getViralLoopsStoredData = (
  viralLoopsCampaignId: string
): ViralLoopsUser | undefined => {
  return localStorage.getItem(viralLoopsCampaignId + "#user")
    ? JSON.parse(localStorage.getItem(viralLoopsCampaignId + "#user") as string)
    : undefined;
};

export const identifyViralLoopsUser = async (
  publicApiKey: string,
  { email, firstName, lastName }: NewViralLoopsUserInput,
  referralCode?: string
): Promise<ViralLoopsUser> => {
  const resp = await fetch(
    "https://app.viral-loops.com/api/v3/campaign/participant",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        publicToken: publicApiKey,
        user: {
          firstname: firstName,
          lastname: lastName,
          email: email,
        },
        referrer: referralCode
          ? {
              referralCode: referralCode,
            }
          : {},
      }),
    }
  );

  const data = await resp.json();

  storeViralLoopsStoredData(publicApiKey, JSON.stringify(data));

  return data;
};

export const createReferralLink = (baseUrl: string, code: string): string => {
  const url = new URL(baseUrl);
  url.searchParams.set("autoDetect", "1");
  url.searchParams.set("referralCode", code);
  return url.toString();
};

export const getParticipantMetaData = async (
  publicApiKey: string,
  email: string
): Promise<{
  rank: number;
  totalReferrals: number;
}> => {
  const resp = await fetch(
    "https://app.viral-loops.com/api/v3/campaign/participant/rank?" +
      new URLSearchParams({
        email,
        publicToken: publicApiKey,
      }),
    {
      method: "GET",
    }
  );

  const data = await resp.json();

  console.log({ data });

  return {
    rank: data?.rank,
    totalReferrals: data?.referralCountTotal,
  };
};
