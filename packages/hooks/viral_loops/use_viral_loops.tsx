import { createContext, useContext } from "react";
import {
  createReferralLink,
  getParticipantMetaData,
  getViralLoopsStoredData,
  identifyViralLoopsUser,
  NewViralLoopsUserInput,
} from "./viral_loops";

const viralLoopsContext = createContext<useViralLoopsReturnType>(
  {} as useViralLoopsReturnType
);

export function ProvideViralLoops({ children, viralLoopsCampaignId }) {
  const vl = useProvideViralLoops(viralLoopsCampaignId);
  return (
    <viralLoopsContext.Provider value={vl}>
      {children}
    </viralLoopsContext.Provider>
  );
}
export const useViralLoops = (): useViralLoopsReturnType => {
  return useContext(viralLoopsContext);
};

interface useViralLoopsReturnType {}

const useProvideViralLoops = (
  viralLoopsCampaignId: string
): useViralLoopsReturnType => {
  return {
    getStoredData: () => getViralLoopsStoredData(viralLoopsCampaignId),
    createNewViralLoopsUser: async (user: NewViralLoopsUserInput) => {
      return await identifyViralLoopsUser(viralLoopsCampaignId, user);
    },
    getUserData: async (email: string) => {
      return await getParticipantMetaData(viralLoopsCampaignId, email);
    },
    getReferralLink: createReferralLink,
  };
};
