import { numberFormatter } from "@p/utils";
import { WaitlistPage } from "@project/components/pages/waitlist_page";
import { useAuth } from "@project/hooks/use_auth";
import { useReservations } from "@project/hooks/use_reservations";
import { useViralLoops } from "@project/hooks/viral_loops/use_viral_loops";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default () => {
  const { user, isAuthenticating, signout } = useAuth();

  const {
    getUserData,
    getReferralLink,
    createNewViralLoopsUser,
    getStoredData,
  } = useViralLoops();

  const [rank, setRank] = useState(0);
  const [referallCode, setReferallCode] = useState("");

  useEffect(() => {
    const referallCode = getStoredData()?.referralCode;

    if (referallCode) {
      setReferallCode(referallCode);
    }

    if (!isAuthenticating && user) {
      (async () => {
        const userData = await getUserData(user?.email);

        console.log({ userData });

        setRank(userData?.rank);

        if (!userData.rank) {
          await createNewViralLoopsUser({
            email: user?.email,
          });

          const referallCode = getStoredData()?.referralCode;

          if (referallCode) {
            setReferallCode(referallCode);
          }
        }
      })();
    }
  }, [isAuthenticating]);

  const { currentPanels } = useReservations();

  return (
    <WaitlistPage
      waitlistPosn={rank ? numberFormatter(rank) : "Loading..."}
      referralLink={getReferralLink(
        "https://app.legends.solar/reserve",
        referallCode
      )}
      panelsReserved={currentPanels}
    />
  );
};
