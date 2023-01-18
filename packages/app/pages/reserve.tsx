import { useReservations } from "utility/use_reservations";
import { ReservePanelPage } from "@project/components/pages/reserve_panel_page";
import { useRouter } from "next/router";
import { ro } from "date-fns/locale";
import { useAuth } from "@project/hooks/use_auth";

export default () => {
  const {
    loading,
    currentPanels,
    setCurrentPanels,
    costPerPanel,
    currentReservedPanels,
    maxPanelReservations,
    confirmPanels,
  } = useReservations();

  const router = useRouter();

  const { signout } = useAuth();

  return (
    <ReservePanelPage
      currentPanels={currentPanels}
      setCurrentPanels={setCurrentPanels}
      confirmPanels={confirmPanels}
      currentReservedPanels={currentReservedPanels ? currentReservedPanels : 0}
      costPerPanel={costPerPanel ? costPerPanel : 250}
      maxPanelReservations={maxPanelReservations ? maxPanelReservations : 1000}
      onGetEarlyAccess={() => router.push("./reserve")}
      onCheckStatus={() => router.push("./waitlist")}
      onLogin={() => router.push("./sign_in")}
      onLogout={signout}
    />
  );
};
